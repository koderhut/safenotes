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

package events_test

import (
	"testing"

	"github.com/koderhut/safenotes/events"
)

func TestNewSubscriber(t *testing.T) {
	testHandler := func(_ chan interface{}) {}
	tt := []struct {
		name    string
		topic   string
		handler events.EventHandler
	}{
		{"create subscriber for topic", "test", testHandler},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			inst := events.NewSubscriber(tc.topic, tc.handler)

			if tc.topic != inst.GetEventName() {
				t.Errorf("Expected [%v]; got [%v]", tc.topic, inst.GetEventName())
			}

			if nil == inst.GetHandler() {
				t.Errorf("Expected an event handler; got nil")
			}
		})
	}
}
