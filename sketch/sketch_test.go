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

package sketch_test

import (
	"fmt"
	"io"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/koderhut/safenotes/sketch"
)

func TestNew(t *testing.T) {
	tests := []struct {
		name    string
		args    sketch.Config
		parser  sketch.Parser
		wantErr error
	}{
		{"with proper path", sketch.Config{TemplatesDir: "./"}, &mockParser{}, nil},
		{"with invalid path", sketch.Config{TemplatesDir: "/1"}, &mockParser{}, sketch.ErrWrongPath},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			inst, err := sketch.New(tt.args, tt.parser)

			assert.IsType(t, sketch.Template(inst), inst, "expected sketch.SketchTemplate")

			if (err != nil) && err != tt.wantErr {
				t.Errorf("expected error [%v], got [%v]", tt.wantErr, err)
				return
			}

			if tt.wantErr != nil {
				assert.EqualError(t, tt.wantErr, err.Error())
				return
			}

			res := inst("test")
			assert.IsType(t, &sketch.Sketch{}, res, "expected sketch.Sketch, got %v", res)
		})
	}
}

func TestSketch_Render(t *testing.T) {
	tests := []struct {
		name   string
		config sketch.Config
		vars   []interface{}
		err    error
		expected string
	}{
		{"with variables", sketch.Config{TemplatesDir: "./"}, []interface{}{"test var"}, nil, "[test var]"},
		{"without variables", sketch.Config{TemplatesDir: "./"}, make([]interface{}, 0), nil, "[]"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			parser := new(mockParser)
			parser.On("Render", mock.Anything, mock.Anything).Once()

			sketchInit, err := sketch.New(tt.config, parser)
			if err != nil {
				t.Errorf("unexpected error [%v]", err)
			}

			inst := sketchInit("test")
			res, err := inst.Render(tt.vars...)
			if err != nil && err != tt.err {
				t.Errorf("unexpected error [%v]", err)
			}

			assert.Equal(t, tt.expected, res, "expected [%v], got [%v]", tt.expected, res)
			if tt.err == nil {
				return
			}
			assert.Errorf(t, err, "expected error [%v], got [%v]", tt.err, err)
		})
	}
}

type mockParser struct {
	mock.Mock
}

func (p *mockParser) LoadFiles(s ...string) (sketch.Parser, error) {
	args := p.Called(s)
	return args.Get(0).(sketch.Parser), nil
}

func (p *mockParser) Render(w io.Writer, templateFile string, vars interface{}) error {
	p.Called(w, vars)
	x := fmt.Sprintf("%v", vars.(interface{}))
	w.Write([]byte(x))
	return nil
}
