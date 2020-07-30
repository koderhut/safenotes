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
	"time"

	"github.com/google/uuid"
)

// Note type used for defining a note
type Note struct {
	ID      uuid.UUID
	Content string
	Date    time.Time
	Notify  Notification
}

type Notification struct {
	Recipient string
	Sender    string
}

const (
	ExpireOnRead    = "on-read"
	ExpireAfter5M   = "5m"
	ExpireAfter30M  = "30m"
	ExpireAfter1H   = "1h"
	ExpireAfter1DAY = "24h"
	ExpireAfter2DAY = "48h"
	ExpireAfter7DAY = "168h"
)

type NoteOptions func(*Note)

func NewNote(opts ...NoteOptions) *Note {
	n := &Note{
		ID:      uuid.New(),
		Content: "",
		Date:    time.Time{},
		Notify:  Notification{},
	}

	for _, opt := range opts {
		opt(n)
	}

	return n
}

func FromInput(input InputMessage) NoteOptions {
	return func(note *Note) {
		note.Content = input.Content
		note.Notify = input.Notify
	}
}
