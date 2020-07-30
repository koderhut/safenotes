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

package notification

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_nullHandler_Send(t *testing.T) {
	tests := []struct {
		name    string
		wantErr error
	}{
		{"testing nullHandler", nil},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h := nullHandler{}
			comm := DummyCommunique{}
			assert.Equal(t, nil, h.Send(comm))
		})
	}
}

type DummyCommunique struct {}

func (d DummyCommunique) GetRecipient() Identity {
	return DummyId{}
}

func (d DummyCommunique) GetSender() Identity {
	return DummyId{}
}

func (d DummyCommunique) GetMessage() string {
	return "test"
}

func (d DummyCommunique) GetSubject() string {
	return "test"
}

type DummyId Id

func (d DummyId) String() string {
	return "test dummy Id"
}



