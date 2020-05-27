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
			got := NewMemoryRepo(tt.args)
			if got == tt.want {
				t.Errorf("NewMemoryRepo() = %v, want %v", got, tt.want)
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
			{"fetching missing entry", []*Note{testNote}, "test", &Note{}, "note not found"},
		}
	)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewMemoryRepo(tt.fields)

			got, err := s.FetchByID(tt.id)

			if (err != nil) && err.Error() != tt.wantErr {
				t.Errorf("Expected error = [%v], got [%v]", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Expected [%v]; got [%v]", tt.want, got)
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
			{"fetching missing entry", []*Note{testNote}, "test", &Note{}, "note not found"},
		}
	)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewMemoryRepo(tt.fields)

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
			s := NewMemoryRepo(make([]*Note, 0))

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

func TestMemoryRepo_StoreWithTimeout(t *testing.T) {
	tests := []struct {
		name    string
		content string
		expire  string
		want    string
	}{
		{"store into repo", "test_content", "2s", "test_content"},
	}

	errTests := []struct {
		name    string
		content string
		expire  string
		err     string
	}{
		{"store into repo with bad duration", "test_content", "abc", "time: invalid duration abc"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewMemoryRepo(make([]*Note, 0))

			got, err := s.StoreWithTimeout(tt.content, tt.expire)

			if err != nil {
				t.Errorf("StoreWithTimeout() error = %v", err)
				return
			}

			if !reflect.DeepEqual(got.Content, tt.want) {
				t.Errorf("Expected content [%v]; got [%v]", tt.want, got.Content)
			}
		})
	}

	for _, tt := range errTests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewMemoryRepo(make([]*Note, 0))

			_, err := s.StoreWithTimeout(tt.content, tt.expire)

			if err == nil || err.Error() != tt.err {
				t.Errorf("Expected error [%v]; got [%v]", tt.err, err)
			}
		})
	}
}

func TestMemoryRepo_AutoExpireNote(t *testing.T) {
	tt := []struct {
		name       string
		note       string
		expiration string
		waittime   string
	}{
		{"auto-expire note after 5s", "test_content", "3s", "5s"},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			s := NewMemoryRepo(make([]*Note, 0))

			n, err := s.StoreWithTimeout(tc.note, tc.expiration)
			if err != nil{
				t.Errorf("Unexpected error fetching note; got [%v]", err)
			}

			note, err := s.FetchByID(n.ID.String())
			if err != nil {
				t.Errorf("Unexpected error fetching note; got [%v]", err)
			}

			// double check that the retrieved note is the one we expect
			if n.Content != note.Content {
				t.Errorf("Expected [%v]; got [%v]", tc.note, note.Content)
			}

			// wait while the timer expires
			d, _ := time.ParseDuration(tc.waittime)
			time.Sleep(d)

			// try fetching again the note
			_, err = s.FetchByID(n.ID.String())
			if err != ErrNotFound {
				t.Errorf("Expected [%v]; got [%v]", ErrNotFound, err)
			}
		})
	}
}

func TestMemoryRepo_CancellingAutoExpireNote(t *testing.T) {
	tt := []struct {
		name       string
		note       string
		expiration string
	}{
		{"auto-expire note after 5s", "test_content", "10s"},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			s := NewMemoryRepo(make([]*Note, 0))

			n, err := s.StoreWithTimeout(tc.note, tc.expiration)
			if err != nil{
				t.Errorf("Unexpected error fetching note; got [%v]", err)
			}

			note, err := s.Pop(n.ID.String())
			if err != nil {
				t.Errorf("Unexpected error fetching note; got [%v]", err)
			}

			// double check that the retrieved note is the one we expect
			if n.Content != note.Content {
				t.Errorf("Expected [%v]; got [%v]", tc.note, note.Content)
			}

			// try fetching again the note
			_, err = s.FetchByID(n.ID.String())
			if err != ErrNotFound {
				t.Errorf("Expected [%v]; got [%v]", ErrNotFound, err)
			}
		})
	}
}
