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

package note_test

import (
	"reflect"
	"testing"
	"time"

	"github.com/google/uuid"

	. "github.com/koderhut/safenotes/note"
)

func TestNote_NewRepo(t *testing.T) {
	var (
		testUuid uuid.UUID = uuid.New()
		testNote           = &Note{
			ID:      testUuid,
			Content: "test_content",
			Date:    time.Time{},
		}
	)
	tests := []struct {
		name string
		args []*Note
		want *MemoryRepo
	}{
		{"with empty slice", make([]*Note, 0), &MemoryRepo{}},
		{"with 1 element slice", []*Note{testNote}, &MemoryRepo{}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewRepo(tt.args)
			if got == tt.want {
				t.Errorf("NewRepo() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMemoryRepo_FetchByID(t *testing.T) {
	var (
		testUuid uuid.UUID = uuid.New()

		testNote = &Note{
			ID:      testUuid,
			Content: "test_content",
			Date:    time.Time{},
		}

		tests = []struct {
			name    string
			fields  []*Note
			id      string
			want    *Note
			wantErr string
		}{
			{"fetching from repo", []*Note{testNote}, testUuid.String(), testNote, ""},
			{"fetching missing entry", []*Note{testNote}, "test", &Note{}, "note does not exist"},
		}
	)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewRepo(tt.fields)

			got, err := s.FetchByID(tt.id)

			if (err != nil) && err.Error() != tt.wantErr {
				t.Errorf("FetchByID() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("FetchByID() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMemoryRepo_Pop(t *testing.T) {
	var (
		testUuid uuid.UUID = uuid.New()

		testNote = &Note{
			ID:      testUuid,
			Content: "test_content",
			Date:    time.Time{},
		}

		tests = []struct {
			name    string
			fields  []*Note
			id      string
			want    *Note
			wantErr string
		}{
			{"fetching from repo", []*Note{testNote}, testUuid.String(), testNote, ""},
			{"fetching missing entry", []*Note{testNote}, "test", &Note{}, "note does not exist"},
		}
	)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewRepo(tt.fields)

			got, err := s.Pop(tt.id)

			if (err != nil) && err.Error() != tt.wantErr {
				t.Errorf("Pop() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Pop() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMemoryRepo_Store(t *testing.T) {
	tests := []struct {
		name    string
		content string
		want    string
	}{
		{"store into repo", "test_content", "test_content"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewRepo(make([]*Note, 0))

			got, err := s.Store(tt.content)

			if err != nil {
				t.Errorf("Store() error = %v", err)
				return
			}
			if !reflect.DeepEqual(got.Content, tt.want) {
				t.Errorf("Store() got = %v, want %v", got, tt.want)
			}
		})
	}
}
