package note

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type MemoryRepo struct {
	stored []*Note
}

func NewRepo() *MemoryRepo {
	return &MemoryRepo{}
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
