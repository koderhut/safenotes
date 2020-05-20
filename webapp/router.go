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
package webapp

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/koderhut/safenotes/internal/config"
	"github.com/koderhut/safenotes/internal/utilities/logs"
	"github.com/koderhut/safenotes/stats"
	"github.com/koderhut/safenotes/webapp/contracts"
)

var noteStats = stats.New()

func BootstrapRouter(c *config.Parameters, apis []WebRouting, roots []WebRouting) *mux.Router {
	// init router
	router := mux.NewRouter()

	router.Use(requestLogger)
	router.Use(noteStatsLogger)
	router.Use(corsAllowedHost(c.Api.CorsHost))

	router.
		Path("/stats").
		Methods(http.MethodGet).
		HandlerFunc(func(w http.ResponseWriter, request *http.Request) {
			w.Header().Set("Content-Type", "application/json")

			json.NewEncoder(w).Encode(
				&contracts.StatsMessage{
					Status:      true,
					StoredNotes: noteStats.Current,
					TotalNotes:  noteStats.Total,
				},
			)
		})

	apiRouter := router.PathPrefix(c.Api.PathPrefix).Subrouter()

	for _, routerCfg := range roots {
		routerCfg.RegisterRoutes(router)
	}

	for _, apiRouterCfg := range apis {
		apiRouterCfg.RegisterRoutes(apiRouter)
	}

	return router
}

func requestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		route := mux.CurrentRoute(req)
		logs.Writer.Info(fmt.Sprintf("%s %s %s %s", req.Method, req.RemoteAddr, req.RequestURI, route.GetName()))

		next.ServeHTTP(w, req)

		logs.Writer.Info(fmt.Sprintf("Response: %s", w.Header()))
	})
}

func noteStatsLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		route := mux.CurrentRoute(r)

		switch route.GetName() {
		case "notes_store":
			noteStats.Inc()
		case "notes_fetch":
			noteStats.Decr()
		}

		next.ServeHTTP(w, r)
	})
}

func corsAllowedHost(cors string) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", cors)

			next.ServeHTTP(w, r)
		})
	}
}
