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
package logs

import (
	"reflect"
	"testing"

	"github.com/lajosbencz/glo"
)

func TestLogs_NewVerbosityFilter(t *testing.T) {
	type args struct {
		verbose bool
	}
	tests := []struct {
		name  string
		args  args
		level glo.Level
		want  bool
	}{
		{"logging all levels", args{verbose: true}, glo.Debug, true},
		{"logging above info level", args{verbose: false}, glo.Debug, false},
		{"logging above warnings no matter level", args{verbose: false}, glo.Warning, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewVerbosityFilter(tt.args.verbose); !reflect.DeepEqual(got.Check(tt.level, "test", "test"), tt.want) {
				t.Errorf("Expected [%v]; got [%v]", tt.want, got)
			}
		})
	}
}
