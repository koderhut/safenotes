package config_test

import (
	"github.com/koderhut/memorynotes/config"
	"testing"
)

func TestNewConfigParams(t *testing.T) {
	type expectedResult struct {
		IP             string
		Port           string
		Web_PathPrefix string
		Web_Domain     string
	}

	tt := []struct {
		name     string
		params   []string
		expected expectedResult
		err 	 string
	}{
		{
			"full ip:port",
			[]string{"0.0.0.1:44666", "/test", "test.tld"},
			expectedResult{IP: "0.0.0.1", Port: "44666", Web_PathPrefix: "/test", Web_Domain: "test.tld"},
			"",
		},
		{
			"no ip",
			[]string{":44666", "/test", "test.tld"},
			expectedResult{IP: "0.0.0.0", Port: "44666", Web_PathPrefix: "/test", Web_Domain: "test.tld"},
			"",
		},
		{
			"wrong ip",
			[]string{"_44666", "/test", "test.tld"},
			expectedResult{IP: "", Port: "", Web_PathPrefix: "", Web_Domain: ""},
			"incorrect IP:Port values provided",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			res, err := config.NewConfigParams(tc.params[0], tc.params[1], tc.params[2])

			if err !=nil && tc.err == "" {
				t.Errorf("Unexpected error during tests: %s", err.Error())
			}

			if res.IP != tc.expected.IP {
				t.Errorf("Expected IP: %s; got %s", tc.expected.IP, res.IP)
			}

			if res.Port != tc.expected.Port {
				t.Errorf("Expected Port: %s; got %s", tc.expected.Port, res.Port)
			}

			if res.Web.Domain != tc.expected.Web_Domain {
				t.Errorf("Expected Web.Domain: %s; got %s", tc.expected.Web_Domain, res.Web.Domain)
			}

			if res.Web.PathPrefix != tc.expected.Web_PathPrefix {
				t.Errorf("Expected Web.PathPrefix: %s; got %s", tc.expected.Web_PathPrefix, res.Web.PathPrefix)
			}

			if "" != tc.err && err.Error() != tc.err {
				t.Errorf("Expected error %s; got %s", tc.err, err)
			}
		})
	}
}

func TestParameters_Addr(t *testing.T) {
	tt := []struct {
		name     string
		params   []string
		expected string
		err 	 string
	}{
		{
			"full ip:port",
			[]string{"0.0.0.1:44666", "/test", "test.tld"},
			"0.0.0.1:44666",
			"",
		},
		{
			"no ip",
			[]string{":44666", "/test", "test.tld"},
			"0.0.0.0:44666",
			"",
		},
		{
			"wrong ip",
			[]string{"_44666", "/test", "test.tld"},
			"",
			"missing IP or port information",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			cfg, _ := config.NewConfigParams(tc.params[0], tc.params[1], tc.params[2])
			res, err := cfg.Addr()

			if err !=nil && tc.err == "" {
				t.Errorf("Unexpected error during tests: %s", err.Error())
			}

			if "" != tc.err && err.Error() != tc.err {
				t.Errorf("Expected error %s; got %s", tc.err, err)
			}

			if res != tc.expected {
				t.Errorf("Expected address %s; got %s", tc.expected, res)
			}
		})
	}
}

func TestParameters_ParseTLD(t *testing.T) {
	tt := []struct {
		name     string
		params   []string
		expected string
		err 	 string
	}{
		{
			"full tld:port",
			[]string{"0.0.0.1:44666", "/test", "test.tld"},
			"test.tld:44666",
			"",
		},
		{
			"no port: 80",
			[]string{":80", "/test", "test.tld"},
			"test.tld",
			"",
		},
		{
			"no port: 443",
			[]string{":443", "/test", "test.tld"},
			"test.tld",
			"",
		},
		{
			"wrong ip",
			[]string{"_44666", "/test", "test.tld"},
			"",
			"missing port information",
		},
		{
			"no domain",
			[]string{":44666", "/test", ""},
			"",
			"missing domain information",
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			cfg, _ := config.NewConfigParams(tc.params[0], tc.params[1], tc.params[2])
			res, err := cfg.ParseTLD()

			if err !=nil && tc.err == "" {
				t.Errorf("Unexpected error during tests: %s", err.Error())
			}

			if "" != tc.err && err.Error() != tc.err {
				t.Errorf("Expected error %s; got %s", tc.err, err)
			}

			if res != tc.expected {
				t.Errorf("Expected URL %s; got %s", tc.expected, res)
			}
		})
	}
}
