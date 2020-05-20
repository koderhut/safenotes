package glo

import (
	"fmt"
	"strings"
	"time"
)

const (
	// DefaultFormat is used by default
	DefaultFormat string = "{T} [{L}] {M}"

	dateFormat string = "2006-01-02T15:04:05Z07:00"
)

// Formatter formats a log event
type Formatter interface {
	Format(time.Time, Level, string, ...interface{}) string
}

// NewFormatter creates a Formatter from a string
func NewFormatter(f string) Formatter {
	return &formatter{f}
}

type formatter struct {
	format string
}

func (f *formatter) Format(time time.Time, level Level, line string, params ...interface{}) string {
	m := fmt.Sprintf(line, params...)
	r := strings.NewReplacer(
		"{T}", time.Format(dateFormat),
		"{L}", level.String(),
		"{M}", m,
	)
	return r.Replace(f.format)
}
