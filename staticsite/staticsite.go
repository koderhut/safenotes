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
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"

	"github.com/koderhut/safenotes/internal/config"
	"github.com/koderhut/safenotes/internal/utilities/logs"
)

type StaticSite struct {
	staticPath string
	index      string
	config     config.StaticSite
}

// NewHandler init a new instance
func NewHandler(cfg config.StaticSite) *StaticSite {
	return &StaticSite{
		staticPath: cfg.Resources,
		index:      cfg.Index,
		config:     cfg,
	}
}

// RegisterRoutes helps register the routes for the SPA app
func (sw StaticSite) RegisterRoutes(r *mux.Router) {
	r.Path("/").Handler(http.RedirectHandler("/app/", http.StatusMovedPermanently))

	// static app will be served from /app
	app := r.Name("app_root").PathPrefix("/app/").Subrouter()
	app.Name("app_static_envjs").Path("/env.js").Methods(http.MethodGet).HandlerFunc(sw.envJs)
	app.Name("app_static").Methods(http.MethodGet).Handler(http.StripPrefix("/app", sw))
}

// ServeHTTP serve the React SPA app
func (sw StaticSite) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		logs.Writer.Info(fmt.Sprintf(err.Error()))
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(sw.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)

	if os.IsNotExist(err) {
		// if path does not exist pass index.html instead
		// basically sending the front-controller for the frontend app
		logs.Writer.Info(fmt.Sprintf("[%s] does not exist! Trying to send [%s]", path, sw.index))
		http.ServeFile(w, r, filepath.Join(sw.staticPath, sw.index))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		logs.Writer.Info(fmt.Sprintf(err.Error()))
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(sw.staticPath)).ServeHTTP(w, r)
}

// envJS serve the env.js config for the React SPA
// It helps make the SPA app more configurable
func (sw StaticSite) envJs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/javascript")

	var buf bytes.Buffer
	buf.WriteString("window.snenv=")
	encoder := json.NewEncoder(&buf)
	err := encoder.Encode(sw.config.EnvJs)
	if err != nil {
		logs.Writer.Info(fmt.Sprintf(err.Error()))
	}
	buf.WriteTo(w)
}
