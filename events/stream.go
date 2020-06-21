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

package events

import (
	"sync"
)

type EventsBroker struct {
	mutex   sync.RWMutex
	streams map[string] []chan interface{}
	closing bool
}

// NewBroker create a new instance of EventsBroker
func NewBroker() *EventsBroker {
	return &EventsBroker{
		streams: make(map[string] []chan interface{}),
		closing: false,
	}
}

// Publish pushes message payload to channels
func (s *EventsBroker) Publish(ev Event) {
	s.mutex.RLock()
	defer s.mutex.RUnlock()

	if s.closing {
		return
	}

	for _, ch := range s.streams[ev.GetName()] {
		go func(c chan interface{}, e Event) {
			c <- e.GetPayload()
		}(ch, ev)
	}

	return
}

// Subscribe registers a new channel for a specific subscriber topic
func (s *EventsBroker) Subscribe(l Subscriber) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	ch := make(chan interface{})
	s.streams[l.GetEventName()] = append(s.streams[l.GetEventName()], ch)
	handler := l.GetHandler()
	go handler(ch)
}

// Shutdown closes all channels
func (s *EventsBroker) Shutdown() {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	if !s.closing {
		s.closing = true
		for _, stream := range s.streams {
			for _, ch := range stream {
				close(ch)
			}
		}
	}
}
