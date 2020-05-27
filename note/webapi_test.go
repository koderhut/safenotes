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
package note_test

import (
	"encoding/json"
	"github.com/koderhut/safenotes/webapp/contracts"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	. "github.com/koderhut/safenotes/note"
)

const ZeroUuid = "00000000-0000-0000-0000-000000000000"

func TestWebApi_RegisterRoutes(t *testing.T) {
	var (
		zeroUuid, _ = uuid.Parse(ZeroUuid)
		testRouter  = mux.NewRouter()
		api         = NewWebApi(NewMemoryRepo([]*Note{&Note{
			ID:      zeroUuid,
			Content: "test_content",
			Date:    time.Time{},
		}}))
		routes = map[string]map[string]string{
			"/notes_": {
				"methods": "",
				"name":    "",
			},
			"/notes_POST": {
				"methods": "POST",
				"name":    "notes_store",
			},
			"/notes/{note}_GET": {
				"methods": "GET",
				"name":    "notes_fetch",
			},
		}
	)

	api.RegisterRoutes(testRouter)

	testRouter.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		routeTpl, _ := route.GetPathTemplate()
		methods, _ := route.GetMethods()
		routeMethods := strings.Join(methods, ", ")
		expectedName := routeTpl + "_" + routeMethods

		t.Run(expectedName, func(t *testing.T) {
			testRoute := routes[expectedName]
			if testRoute == nil {
				t.Errorf("Unknown registered path: [%v]", routeTpl)
			}
			if testRoute["name"] != route.GetName() {
				t.Errorf("Got name [%v]; want [%v] for route [%v]", route.GetName(), testRoute["name"], routeTpl)
			}
		})

		return nil
	})
}

func TestWebApi_Retrieve(t *testing.T) {
	type args struct {
		w httptest.ResponseRecorder
		r *http.Request
	}
	var (
		zeroUuid, _ = uuid.Parse(ZeroUuid)
		notesApi    = NewWebApi(NewMemoryRepo([]*Note{&Note{
			ID:      zeroUuid,
			Content: "test_content",
			Date:    time.Time{},
		}}))
		r     = httptest.NewRequest("GET", "http://localhost/api/notes/"+ZeroUuid, nil)
		req   = mux.SetURLVars(r, map[string]string{"note": ZeroUuid})
		tests = []struct {
			name   string
			args   args
			want   string
			status int
		}{
			{
				"retrieve a note",
				args{*httptest.NewRecorder(), req},
				"{\"complete\":true,\"content\":\"test_content\"}\n",
				200,
			},
			{
				"retrieve a non-existent note",
				args{*httptest.NewRecorder(), req},
				"{\"status\":false,\"message\":\"An error occurred retrieving your note!\"}\n",
				404,
			},
		}
	)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			notesApi.Retrieve(&tt.args.w, tt.args.r)
			res := tt.args.w.Result()

			if res.StatusCode != tt.status {
				t.Errorf("Expected status code [%v]; got [%v]", tt.status, res.StatusCode)
			}

			content, err := ioutil.ReadAll(res.Body)
			defer res.Body.Close()
			if err != nil {
				t.Fatalf("Could not read body: [%v]", err)
			}

			if string(content) != tt.want {
				t.Errorf("Expecte response [%v]; got [%v]", tt.want, string(content))
			}
		})
	}
}

func TestWebApi_Store(t *testing.T) {
	type args struct {
		w httptest.ResponseRecorder
		c string
	}
	var (
		notesApi = NewWebApi(NewMemoryRepo(make([]*Note, 0)))
		tests    = []struct {
			name   string
			args   args
			status int
			isErr  bool
			err    string
		}{
			{
				"store a note",
				args{*httptest.NewRecorder(), "{\"content\":\"test_content\"}"},
				200,
				false,
				"",
			},
			{
				"store a 30 minutes self-destructing note",
				args{*httptest.NewRecorder(), "{\"content\":\"test_content\", \"auto-expire\":\"30m\"}"},
				200,
				false,
				"",
			},
			{
				"try to store a note without content",
				args{*httptest.NewRecorder(), ""},
				400,
				true,
				"Missing or invalid input data!",
			},
		}
	)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest("POST", "http://localhost/api/notes", strings.NewReader(tt.args.c))
			notesApi.Store(&tt.args.w, req)
			res := tt.args.w.Result()

			if res.StatusCode != tt.status {
				t.Errorf("Expected status code [%v]; got [%v]", tt.status, res.StatusCode)
			}

			if tt.isErr == false {
				var jsonCnt LinkMessage
				json.NewDecoder(res.Body).Decode(&jsonCnt)
				_, err := uuid.Parse(jsonCnt.Id)
				if err != nil {
					t.Errorf("Expected UUID of link; got [%v]", err)
				}
			} else {
				var jsonCnt contracts.ErrorMessage
				json.NewDecoder(res.Body).Decode(&jsonCnt)
				if jsonCnt.Message != tt.err {
					t.Errorf("Expected error [%v]; got [%v]", tt.err, jsonCnt.Message)
				}
			}
		})
	}
}

func TestValidate_InputMessage(t *testing.T) {
	tt := []struct {
		name          string
		args          InputMessage
		expected      bool
		validationErr []string
	}{
		{
			"provide proper values",
			InputMessage{
				Content:    "this is content",
				AutoExpire: "30m",
			},
			true,
			make([]string, 0),
		},
		{
			"provide invalid values for all fields",
			InputMessage{
				Content:    "",
				AutoExpire: "abcd",
			},
			false,
			[]string{
				"invalid input for: [InputMessage.Content/required] with value: []",
				"invalid input for: [InputMessage.AutoExpire/expire-interval] with value: [abcd]",
			},
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			res, failed := tc.args.IsValid()

			if res != tc.expected {
				t.Errorf("Expected [%v] validating [%v]; got [%v]", tc.expected, tc.args, res)
			}

			if len(failed) != 0 {
				for i, v := range failed {
					if v != tc.validationErr[i] {
						t.Errorf("Expected error [%v]; got [%v]", tc.validationErr[i], v)
					}
				}
			}
		})
	}
}
