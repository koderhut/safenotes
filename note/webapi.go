package note

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/koderhut/memorynotes/contracts"
)

// NotesWebApi controller
type WebApi struct{}

var (
	notesStorage MemoryRepo
)

// NewWebApi initialize a new controller
func NewWebApi() *WebApi {
	return &WebApi{}
}

// Register the Notes api endpoints
func (nc WebApi) RegisterRoutes(r *mux.Router) {
	notes := r.PathPrefix("/notes").Subrouter()

	notes.Name("notes_store").Path("").Methods(http.MethodPost).HandlerFunc(nc.Store)
	notes.Name("notes_fetch").Path("/{note}").Methods(http.MethodGet).HandlerFunc(nc.Retrieve)
}

// Retrieve controller to get the secret note
func (nc WebApi) Retrieve(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	note, err := notesStorage.Pop(params["note"])

	if nil != err {
		if "note does not exist" == err.Error() {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}

		reply := contracts.ErrorMessage{Status: false, Message: "An error occurred retrieving your note!"}
		json.NewEncoder(w).Encode(&reply)

		return
	}

	reply := contracts.ContentMessage{Status: true, Content: note.Content}

	json.NewEncoder(w).Encode(&reply)
}

// Store controller to save into memory the secret note
func (nc WebApi) Store(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var pl contracts.InputMessage
	_ = json.NewDecoder(r.Body).Decode(&pl)
	note, err := notesStorage.Store(pl.Content)

	if nil != err {
		w.WriteHeader(http.StatusInternalServerError)
		reply := contracts.ErrorMessage{Status: true, Message: "An error occurred storing your note!"}
		json.NewEncoder(w).Encode(&reply)

		return
	}

	//link := nc.urlGenerator.Generate("/notes/" + note.ID.String())
	reply := contracts.LinkMessage{Status: true, Link: "", Id: note.ID.String()}

	json.NewEncoder(w).Encode(&reply)
}
