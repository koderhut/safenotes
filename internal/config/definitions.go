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
package config

// Top level options
type Parameters struct {
	Server     ServerParams
	Api        ApiParams  `mapstructure:"web-api"`
	StaticSite StaticSite `mapstructure:"static-site"`
	Verbose    bool
}

// Parameters for configuring the server part
// of the application, ie. port, ip, https
type ServerParams struct {
	IP    string
	Port  string
	Https Https
}

// https configuration parameters
type Https struct {
	Enable         bool
	Port           string
	Cert           string
	CertKey        string `mapstructure:"cert-key"`
	ServerName     string `mapstructure:"server-name"`
	EnableRedirect bool   `mapstructure:"enable-redirect"`
	RedirectTo     string `mapstructure:"redirect-to"`
}

// static-site module configuration
type StaticSite struct {
	Serve     bool
	Index     string `mapstructure:"index"`
	Resources string
	EnvJs     string `mapstructure:"envjs"`
}

// web api general configuration options
type ApiParams struct {
	PathPrefix string `mapstructure:"path-prefix"`
	Domain     string
	CorsHost   string `mapstructure:"cors-host"`
}
