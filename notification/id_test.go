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

func TestId_String(t *testing.T) {
	tests := []struct {
		name     string
		instance Id
		want     string
	}{
		{"test Id.String returns correct string", Id{Addr: "test"}, "test"},
		{"test Recipient.String returns correct string", Recipient{Addr: "test"}, "test"},
		{"test Sender.String returns correct string", Sender{Addr: "test"}, "test"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.IsType(t, Id{}, tt.instance)
			assert.Equal(t, tt.want, tt.instance.String())
		})
	}
}
