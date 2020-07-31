/*
 * Copyright (c) 2020. Denis Rendler <connect@rendler.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package note

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gorilla/mux"

	ev "github.com/koderhut/safenotes/events"
	"github.com/koderhut/safenotes/internal/utilities/logs"
	"github.com/koderhut/safenotes/webapp/contracts"
)

// NotesWebApi controller
type WebApi struct{
	notesStorage Repository
	eventStream  ev.Broker
}

// NewWebApi initialize a new controller
func NewWebApi(repository Repository, evStream ev.Broker) *WebApi {
	return &WebApi{notesStorage: repository, eventStream: evStream}
}
// @deprecated
func NewWithMemoryRepo() *WebApi {
	return NewWebApi(NewMemoryRepo(), nil)
}

// RegisterRoutes the Notes api endpoints
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
		if errors.As(err, &ErrNotFound) {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}

		reply := contracts.ErrorMessage{Status: false, Message: "An error occurred retrieving your note!"}
		json.NewEncoder(w).Encode(&reply)

		return
	}

	reply := ContentMessage{Status: true, Content: note.Content}

	json.NewEncoder(w).Encode(&reply)

	// publish a note read event
	nc.eventStream.Publish(NewFetchedEvent(*note))
}

// Store controller to save into memory the secret note
func (nc WebApi) Store(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var message InputMessage
	_ = json.NewDecoder(r.Body).Decode(&message)

	if ok, validations := message.IsValid(); ok == false {
		logs.Writer.Error("InputMessage validation errors found", validations)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(contracts.ErrorMessage{
			Status:  false,
			Message: "Missing or invalid input data!",
		})
		return
	}

	var (
		note *Note
		err error
	)

	note = NewNote(FromInput(message))

	if message.IsAutoExpire() {
		_, err = nc.notesStorage.StoreWithTimeout(note, message.AutoExpire)
	} else {
		_, err = nc.notesStorage.Store(note)
	}

	if nil != err {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(
			&contracts.ErrorMessage{Status: true, Message: "An error occurred storing your note!"},
		)

		return
	}

	json.NewEncoder(w).Encode(&LinkMessage{Status: true, Id: note.ID.String()})

	// publish a new note event
	nc.eventStream.Publish(NewStoredEvent(*note))
}
