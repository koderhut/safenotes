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
package config_test

import (
	"testing"

	"github.com/koderhut/safenotes/internal/config"
)

func TestParameters_ListeningAddr(t *testing.T) {
	tt := []struct {
		name     string
		params   []string
		expected string
	}{
		{
			"full ip:port",
			[]string{"1.1.1.1", "44666"},
			"1.1.1.1:44666",
		},
		{
			"no ip",
			[]string{"", "44666"},
			"0.0.0.0:44666",
		},
		{
			"wrong ip",
			[]string{"_", "44666"},
			"0.0.0.0:44666",
		},
		{
			"wrong port",
			[]string{"1.1.1.1", ""},
			"1.1.1.1:80",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			cfg := config.NewConfigParams()
			cfg.Server.IP = tc.params[0]
			cfg.Server.Port = tc.params[1]

			res := cfg.Server.ListeningAddr()

			if res != tc.expected {
				t.Errorf("Expected address %s; got %s", tc.expected, res)
			}
		})
	}
}

func TestParameters_HTTPSListeningAddr(t *testing.T) {
	tt := []struct {
		name     string
		params   []string
		expected string
	}{
		{
			"full ip:port",
			[]string{"1.1.1.1", "44666"},
			"1.1.1.1:44666",
		},
		{
			"no ip",
			[]string{"", "44666"},
			"0.0.0.0:44666",
		},
		{
			"wrong ip",
			[]string{"_", "44666"},
			"0.0.0.0:44666",
		},
		{
			"wrong port",
			[]string{"1.1.1.1", ""},
			"1.1.1.1:443",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			cfg := config.NewConfigParams()
			cfg.Server.IP = tc.params[0]
			cfg.Server.Https.Port = tc.params[1]

			res := cfg.Server.HTTPSListeningAddr()

			if res != tc.expected {
				t.Errorf("Expected address %s; got %s", tc.expected, res)
			}
		})
	}
}
