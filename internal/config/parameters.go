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

import (
	"fmt"
	"net"
)

const (
	defaultIp        = "0.0.0.0"
	defaultPort      = "80"
	defaultHttpsPort = "443"
)

func NewConfigParams() *Parameters {
	return &Parameters{
		Verbose: false,
		Server: ServerParams{
			IP:      defaultIp,
			Port:    defaultPort,
			Https: Https{
				Enable:     true,
				Port:       defaultHttpsPort,
				Cert:       "./config/cert.pem",
				CertKey:    "./config/key.pem",
				ServerName: "localhost",
				EnableRedirect: true,
				RedirectTo: "https://localhost",
			},
			Auth: Auth{
				Realm: "localhost - Restricted",
				User: "",
				Pass: "",
			},
		},
		Api: ApiParams{
			PathPrefix: "/api",
			Domain:     "",
			CorsHost:   "https://localhost",
		},
		StaticSite: StaticSite{
			Serve:     false,
			Index:     "index.html",
			Resources: "./www",
			EnvJs:     "window.envjs = {};",
		},
	}
}

// ListeningAddr returns a string representing the HTTP listening address in IP:port format
func (c ServerParams) ListeningAddr() string {
	ip := net.ParseIP(c.IP)

	if ip == nil {
		ip = net.ParseIP(defaultIp)
	}

	port := c.Port
	if port == "" {
		port = defaultPort
	}

	return fmt.Sprintf("%s:%s", ip.String(), port)
}

// HTTPSListeningAddr returns a string representing the HTTPS listening address in IP:port format
func (c ServerParams) HTTPSListeningAddr() string {
	ip := net.ParseIP(c.IP)

	if ip == nil {
		ip = net.ParseIP(defaultIp)
	}

	port := c.Https.Port
	if port == "" {
		port = defaultHttpsPort
	}

	return fmt.Sprintf("%s:%s", ip.String(), port)
}
