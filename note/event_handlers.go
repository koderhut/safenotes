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
	"github.com/koderhut/safenotes/events"
	"github.com/koderhut/safenotes/internal/utilities/logs"
	notify "github.com/koderhut/safenotes/notification"
	"github.com/koderhut/safenotes/sketch"
)

const (
	StoredTemplate  = "new_note.gohtml"
	FetchedTemplate = "note_read.gohtml"
)

var bp sketch.Template

func InitSketch(c sketch.Config) error {
	var err error
	bp, err = sketch.New(c, sketch.HTMLParser(c.Functions))
	return err
}

// RegisterSubscribers
func RegisterSubscribers(broker events.Broker) {
	broker.Subscribe(events.NewSubscriber(StoreEvent, func(c chan interface{}) {
		for n := range c {
			note, ok := n.(Note)
			if !ok || len(note.Notify.Recipient) == 0 {
				return
			}
			message, err := bp(StoredTemplate).Render(note.ID.String())
			if err != nil {
				logs.Writer.Error(err.Error())
			}

			comm := notify.NewNotification(
				notify.ToRecipient(note.Notify.Recipient),
				notify.WithMessage(message),
				notify.WithSubject("You received a new SafeNote"),
			)
			comm.Send() // TODO: add error logging
		}
	}))

	broker.Subscribe(events.NewSubscriber(FetchEvent, func(c chan interface{}) {
		for n := range c {
			note, ok := n.(Note)
			if !ok || len(note.Notify.Sender) == 0 {
				logs.Writer.Debug("no sender")
				return
			}
			message, err := bp(FetchedTemplate).Render(note.Notify.Recipient)
			if err != nil {
				logs.Writer.Error(err.Error())
			}

			comm := notify.NewNotification(
				notify.ToRecipient(note.Notify.Sender),
				notify.WithMessage(message),
				notify.WithSubject("Your SafeNote has been opened"),
			)
			comm.Send() // TODO: add error logging
		}
	}))
}
