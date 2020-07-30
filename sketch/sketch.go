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

package sketch

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Sketch struct {
	parser   Parser
	location string
	template string
}

// type SketchOption func(*Sketch)
type Template func(string) *Sketch

var ErrWrongPath = fmt.Errorf("unable to retrieve proper path to templates folder")

// New
func New(c Config, parser Parser) (Template, error) {
	fs, err := filepath.Abs("")
	if err != nil {
		return nil, ErrWrongPath
	}
	p := filepath.Join(fs, c.TemplatesDir)
	_, err = os.Stat(p)
	if err != nil {
		return nil, ErrWrongPath
	}

	return func(template string) *Sketch {
		return &Sketch{
			parser:   parser,
			location: p,
			template: template,
		}
	}, nil
}

// Render renders template with vars sent
func (s *Sketch) Render(vars ...interface{}) (string, error) {
	buffer := new(bytes.Buffer)
	fileName := strings.TrimRight(s.location+"/"+s.template, "/")
	if err := s.parser.Render(buffer, fileName, vars); err != nil {
		return "", err
	}

	return buffer.String(), nil
}
