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
package note

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type Repository interface {
	FetchByID(id string) (*Note, error)
	Pop(id string) (*Note, error)
	Store(content string) (Note, error)
}

type MemoryRepo struct {
	stored []*Note
}

func NewRepo(s []*Note) *MemoryRepo {
	return &MemoryRepo{stored: s}
}

// FetchByID retrieves a note based on it's ID
func (s MemoryRepo) FetchByID(id string) (*Note, error) {
	_, note, err := s.searchCollection(id)

	return note, err
}

//Store retrieves a note based on it's ID
func (s *MemoryRepo) Store(content string) (Note, error) {
	note := Note{
		ID:      uuid.New(),
		Content: content,
		Date:    time.Now(),
	}
	s.stored = append(s.stored, &note)

	return note, nil
}

// Pop is used to retrieve a note and remove it from the collection at the same time
func (s *MemoryRepo) Pop(id string) (*Note, error) {
	index, note, err := s.searchCollection(id)

	if -1 != index && nil == err {
		s.stored = append(s.stored[:index], s.stored[index+1:]...)
	}

	return note, err
}

func (s MemoryRepo) searchCollection(id string) (int, *Note, error) {
	for index, item := range s.stored {
		if item.ID.String() == id {
			return index, item, nil
		}
	}

	return -1, &Note{}, errors.New("note does not exist")
}
