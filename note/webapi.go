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
package note

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/koderhut/safenotes/webapp/contracts"
)

// NotesWebApi controller
type WebApi struct{
	notesStorage Repository
}

// NewWebApi initialize a new controller
func NewWebApi(repository Repository) *WebApi {
	return &WebApi{notesStorage: repository}
}

func NewWithMemoryRepo() *WebApi {
	return NewWebApi(NewRepo(make([]*Note, 0)))
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
	note, err := nc.notesStorage.Pop(params["note"])

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

	if pl.Content == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(contracts.ErrorMessage{
			Status:  false,
			Message: "Missing content data!",
		})
	}

	note, err := nc.notesStorage.Store(pl.Content)

	if nil != err {
		w.WriteHeader(http.StatusInternalServerError)
		reply := contracts.ErrorMessage{Status: true, Message: "An error occurred storing your note!"}
		json.NewEncoder(w).Encode(&reply)

		return
	}

	reply := contracts.LinkMessage{Status: true, Link: "", Id: note.ID.String()}

	json.NewEncoder(w).Encode(&reply)
}
