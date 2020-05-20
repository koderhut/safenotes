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
package logs

import (
	"bytes"
	"io"
	"os"
	"strings"

	"github.com/lajosbencz/glo"
)

const EOL = "\n"

var (
	Writer glo.Facility
	stdIo  = os.Stdout
	errIo  = os.Stderr
)

func init() {
	Writer = glo.NewFacility()

	ho := glo.NewHandler(stdIo).PushFilter(glo.NewFilterLevelRange(glo.Info, glo.Info))
	he := glo.NewHandler(errIo).PushFilter(glo.NewFilterLevelRange(glo.Error, glo.Emergency))

	Writer.PushHandler(ho).PushHandler(he)
}

// UpdateStdIoHandler resets the Stdout and Stderr loggers based on verbose flag
func UpdateStdIoHandler(verbose bool) {
	Writer.ClearHandlers()
	ho := glo.NewHandler(stdIo).PushFilter(NewVerbosityFilter(verbose))
	he := glo.NewHandler(errIo).PushFilter(glo.NewFilterLevelRange(glo.Error, glo.Emergency))
	Writer.PushHandler(ho).PushHandler(he)
}

// LogBuffer is logging a buffered out by separating the lines using \n as delimiter
func LogBuffer(lvl glo.Level, b bytes.Buffer) {
	for {
		line, err := b.ReadString('\n')
		_ = Writer.Log(lvl, strings.TrimRight(line, EOL))

		if err == io.EOF {
			return
		}
	}
}
