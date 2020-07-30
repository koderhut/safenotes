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
	"errors"
	"fmt"
	"time"

	"github.com/koderhut/safenotes/internal/utilities/logs"
)

type Repository interface {
	FetchByID(string) (*Note, error)
	Pop(string) (*Note, error)
	Store(*Note) (*Note, error)
	StoreWithTimeout(*Note, string) (*Note, error)
}

type MemoryRepo struct {
	stored     []*Note
	autoExpire map[string]*time.Timer
}

func NewMemoryRepo() *MemoryRepo {
	return &MemoryRepo{stored: make([]*Note, 0), autoExpire: make(map[string]*time.Timer)}
}

var ErrNotFound = errors.New("note not found")

// FetchByID retrieves a note based on it's ID
func (s MemoryRepo) FetchByID(id string) (*Note, error) {
	_, note, err := s.searchCollection(id)

	return note, err
}

// Store retrieves a note based on it's ID
func (s *MemoryRepo) Store(note *Note) (*Note, error) {
	s.stored = append(s.stored, note)

	return note, nil
}

// Pop is used to retrieve a note and remove it from the collection at the same time
func (s *MemoryRepo) Pop(id string) (*Note, error) {
	index, note, err := s.searchCollection(id)

	if nil == err {
		s.stored = append(s.stored[:index], s.stored[index+1:]...)
		if timer, ok := s.autoExpire[note.ID.String()]; ok {
			timer.Stop()
		}
	}

	return note, err
}

func (s *MemoryRepo) StoreWithTimeout(note *Note, until string) (*Note, error) {
	note, err := s.Store(note)
	if err != nil {
		return nil, err
	}
	duration, err := time.ParseDuration(until)
	if err != nil {
		return nil, err
	}

	s.autoExpire[note.ID.String()] = time.AfterFunc(duration, func() {
		_, _ = s.Pop(note.ID.String())
		delete(s.autoExpire, note.ID.String())
		logs.Writer.Debug(fmt.Sprintf("Note with ID [%s] has expired and has been removed!", note.ID.String()))
	})

	return note, nil
}

func (s MemoryRepo) searchCollection(id string) (int, *Note, error) {
	for index, item := range s.stored {
		if item.ID.String() == id {
			return index, item, nil
		}
	}

	return -1, &Note{}, ErrNotFound
}
