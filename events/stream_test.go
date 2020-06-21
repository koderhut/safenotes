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
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	. "github.com/koderhut/safenotes/events"
)

func TestNewBroker(t *testing.T) {
	tests := []struct {
		name string
	}{
		{"config new broker instance"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.IsTypef(
				t,
				&EventsBroker{},
				NewBroker(),
				"Expected a pointer to an instance of EventsBroker",
			)
		})
	}
}

func TestEventsBroker_PublishEvent(t *testing.T) {
	broker := NewBroker()
	sub := mockSubscriber{name: "test", handler: func(c chan interface{}) { <-c }}
	sub.On("GetEventName").Return()
	sub.On("GetHandler").Return()

	broker.Subscribe(&sub)

	event := &mockEvent{
		name:    "test",
		payload: "test_payload",
	}
	event.On("GetName").Once()
	event.On("GetPayload").Once()

	broker.Publish(event)
	time.Sleep(1 * time.Second) // TODO: find better way
	event.AssertExpectations(t)
}

func TestEventsBroker_PublishEventOnClosing(t *testing.T) {
	broker := NewBroker()
	sub := mockSubscriber{name: "test", handler: func(c chan interface{}) { <-c }}
	sub.On("GetEventName").Return()
	sub.On("GetHandler").Return()

	broker.Subscribe(&sub)

	event := &mockEvent{
		name:    "test",
		payload: "test_payload",
	}

	broker.Shutdown()
	broker.Publish(event)

	event.AssertExpectations(t)
}

func TestEventsBroker_PublishWithNoSubscribers(t *testing.T) {
	broker := NewBroker()
	event := &mockEvent{
		name:    "test",
		payload: "test_payload",
	}
	event.On("GetName").Once()
	broker.Publish(event)

	event.AssertNotCalled(t, "GetPayload")
	event.AssertExpectations(t)
}

func TestEventsBroker_Subscribe(t *testing.T) {
	broker := NewBroker()
	sub := mockSubscriber{name: "test", handler: func(c chan interface{}) { <-c }}
	sub.On("GetEventName").Return()
	sub.On("GetHandler").Return()

	broker.Subscribe(&sub)

	sub.AssertExpectations(t)
}

type mockEvent struct {
	mock.Mock
	name    string
	payload interface{}
}

func (t *mockEvent) GetName() string {
	t.Called()
	return t.name
}
func (t *mockEvent) GetPayload() interface{} {
	t.Called()
	return t.payload
}

type mockSubscriber struct {
	mock.Mock
	name    string
	handler EventHandler
}

func (t *mockSubscriber) GetEventName() string {
	t.Called()
	return t.name
}
func (t *mockSubscriber) GetHandler() EventHandler {
	t.Called()
	return t.handler
}
