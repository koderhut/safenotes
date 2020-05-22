/*
 * Copyright (c) 2020. Denis Rendler <connect@rendler.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *         http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package stats_test

import (
	"testing"

	"github.com/koderhut/safenotes/stats"
)

func TestStats_Inc(t *testing.T) {
	tt := []struct {
		name string
		calls uint16
		expected map[string]uint
	}{
		{"increment by 1", 1, map[string]uint{"total": 1, "current": 1}},
		{"increment by 2", 2, map[string]uint{"total": 2, "current": 2}},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			s := stats.New()
			var iter uint16 = 1
			for ; iter <= tc.calls; iter++ {
				s.Inc()
			}

			if s.Total != tc.expected["total"] {
				t.Errorf("Expected totals to be %d; got %d after %d calls", tc.expected["total"], s.Total, tc.calls)
			}

			if s.Current != tc.expected["current"] {
				t.Errorf("Expected totals to be %d; got %d after %d calls", tc.expected["total"], s.Current, tc.calls)
			}
		})
	}
}

func TestStats_Decr(t *testing.T) {
	tt := []struct {
		name     string
		incCalls uint16
		decCalls uint16
		expected map[string]uint
	}{
		{"increment by 1, decrement by 1", 1, 1, map[string]uint{"total": 1, "current": 0}},
		{"increment by 2, decrement by 1", 2, 1, map[string]uint{"total": 2, "current": 1}},
		{"increment by 1, decrement by 2", 1, 2, map[string]uint{"total": 1, "current": 0}},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			s := stats.New()
			var iter uint16 = 1
			for ; iter <= tc.incCalls; iter++ {
				s.Inc()
			}
			iter = 1
			for ; iter <= tc.decCalls; iter++ {
				s.Decr()
			}

			if s.Total != tc.expected["total"] {
				t.Errorf("Expected totals to be %d; got %d after %d calls to Inc() and %d calls to Decr()", tc.expected["total"], s.Total, tc.incCalls, tc.decCalls)
			}

			if s.Current != tc.expected["current"] {
				t.Errorf("Expected totals to be %d; got %d after %d calls to Inc() and %d calls to Decr()", tc.expected["total"], s.Current, tc.incCalls, tc.decCalls)
			}
		})
	}
}
