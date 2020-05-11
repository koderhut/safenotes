package note

import (
	"time"

	"github.com/google/uuid"
)

// Note type used for defining a note
type Note struct {
	ID      uuid.UUID
	Content string
	Date    time.Time
}
