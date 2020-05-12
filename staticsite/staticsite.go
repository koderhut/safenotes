/*
Copyright © 2020 Denis Rendler <connect@rendler.me>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package staticsite

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type StaticSite struct {
	staticPath string
	index      string
}

func NewHandler(staticPath, index string) *StaticSite {
	return &StaticSite{
		staticPath: staticPath,
		index:      index,
	}
}

func (sw StaticSite) RegisterRoutes(r *mux.Router) {
	r.Path("/").Handler(http.RedirectHandler("/app/", http.StatusMovedPermanently))

	// static app will be served from /app
	app := r.Name("app_root").PathPrefix("/app/").Subrouter()
	app.Methods(http.MethodGet).Handler(http.StripPrefix("/app", sw))
}

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler. If a file is found, it will be served. If not, the
// file located at the index path on the SPA handler will be served. This
// is suitable behavior for serving an SPA (single page application).
func (sw StaticSite) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		log.Print(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(sw.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)

	if os.IsNotExist(err) {
		http.NotFound(w, r)
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		log.Print(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(sw.staticPath)).ServeHTTP(w, r)

}
