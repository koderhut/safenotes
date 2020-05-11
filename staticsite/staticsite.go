package staticsite

import (
	"net/http"


	"github.com/gorilla/mux"
)

type StaticSite struct {
	staticPath string
	indexPath  string
}

func NewHandler() *StaticSite {
	return &StaticSite{}
}

func (sw StaticSite) RegisterRoutes(r *mux.Router) {
	notes := r.PathPrefix("/notes").Subrouter()

	notes.Name("notes_store").Path("").Methods(http.MethodPost).HandlerFunc(nc.Store)
	notes.Name("notes_fetch").Path("/{note}").Methods(http.MethodGet).HandlerFunc(nc.Retrieve)
}