package glo

import (
	"io"
	"time"
)

// Handler logs to stdout
type Handler interface {
	Logger
	SetFormatter(Formatter) Handler
	ClearFilters() Handler
	PushFilter(Filter) Handler
}

// NewHandler creates handler that prints to an io.Writer
func NewHandler(writer io.Writer) Handler {
	return &handler{
		writer,
		NewFormatter(DefaultFormat),
		[]Filter{},
	}
}

type handler struct {
	writer    io.Writer
	formatter Formatter
	filters   []Filter
}

// Log logs a line with a specific level
func (h *handler) Log(level Level, line string, params ...interface{}) error {
	valid := true
	for _, f := range h.filters {
		if !f.Check(level, line, params) {
			valid = false
			break
		}
	}
	if !valid {
		return nil
	}
	l := h.formatter.Format(time.Now(), level, line, params...) + "\n"
	_, err := h.writer.Write([]byte(l))
	return err
}

func (h *handler) SetFormatter(formatter Formatter) Handler {
	h.formatter = formatter
	return h
}

func (h *handler) ClearFilters() Handler {
	h.filters = []Filter{}
	return h
}

func (h *handler) PushFilter(filter Filter) Handler {
	h.filters = append(h.filters, filter)
	return h
}
