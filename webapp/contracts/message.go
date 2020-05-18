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
package contracts

type InputMessage struct {
	Content      string `json:"content"`
	NotifyOnRead string `json:"notify-read"`
	Recipient    string `json:"notify-recipient"`
}

type LinkMessage struct {
	Status bool   `json:"complete"`
	Link   string `json:"link"`
	Id     string `json:"note-id"`
}

type ContentMessage struct {
	Status  bool   `json:"complete"`
	Content string `json:"content"`
}

type ErrorMessage struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
}

type StatsMessage struct {
	Status      bool `json:"status"`
	StoredNotes uint `json:"stored-notes"`
	TotalNotes  uint `json:"total-notes"`
}
