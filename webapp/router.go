package webapp

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/koderhut/safenotes/config"
	"github.com/koderhut/safenotes/contracts"
	"github.com/koderhut/safenotes/stats"
)

var noteStats = stats.New()

func BootstrapRouter(c *config.Parameters, routing ...WebRouting) *mux.Router {
	// init router
	router := mux.NewRouter()

	router.Use(noteStatsLogger)
	router.Use(mux.CORSMethodMiddleware(router))
	router.Use(corsAllowedHost(c.Web.CorsHost))

	router.
		Path("/stats").
		Methods(http.MethodGet).
		HandlerFunc(func(w http.ResponseWriter, request *http.Request) {
			w.Header().Set("Content-Type", "application/json")

			json.NewEncoder(w).Encode(
				&contracts.StatsMessage{
					Status: true,
					StoredNotes: noteStats.Current,
					TotalNotes: noteStats.Total,
				},
			)
		}).
		Host(fmt.Sprintf("localhost:%s", c.Server.Port))

	api := router.PathPrefix(c.Web.PathPrefix).Subrouter()

	for _, routerCfg := range routing {
		routerCfg.RegisterRoutes(api)
	}

	return router
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
