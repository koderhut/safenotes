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
	"errors"
	"fmt"
	"net"
	"strings"
)

type Parameters struct {
	Server ServerParams
	Web    WebParams
}

type ServerParams struct {
	IP     string
	Port   string
	Debug  bool
	Static StaticSite `mapstructure:"static-site"`
}

type StaticSite struct {
	Serve     bool
	Index     string `mapstructure:"index"`
	Resources string
}

type WebParams struct {
	PathPrefix string `mapstructure:"path-prefix"`
	Domain     string
	CorsHost   string `mapstructure:"cors-host"`
}

func NewConfigParams(addr, prefix, domain, cors string) (Parameters, error) {
	c := Parameters{}

	err := c.parseAddr(addr)

	if err != nil {
		return c, err
	}

	c.Web.PathPrefix = prefix
	c.Web.Domain = domain
	c.Web.CorsHost = cors

	return c, nil
}

// Addr returns the address in IP:port
func (c Parameters) Addr() (string, error) {
	if c.Server.IP == "" || c.Server.Port == "" {
		return "", errors.New("missing IP or port information")
	}

	return fmt.Sprintf("%s:%s", c.Server.IP, c.Server.Port), nil
}

// ParseTLD
func (c Parameters) ParseTLD() (string, error) {
	var port string

	if c.Server.Port == "" {
		return "", errors.New("missing port information")
	}

	if c.Web.Domain == "" {
		return "", errors.New("missing domain information")
	}

	if false == strings.EqualFold(c.Server.Port, "80") && false == strings.EqualFold(c.Server.Port, "443") {
		port = fmt.Sprintf(":%s", c.Server.Port)
	}

	return fmt.Sprintf("%s%s", c.Web.Domain, port), nil
}

// ParseAddr parses and makes sure the IP:port provided are correct
func (c *Parameters) parseAddr(a string) error {
	host, port, err := net.SplitHostPort(a)

	if err != nil {
		return errors.New("incorrect IP:Port values provided")
	}

	if host == "" {
		host = "0.0.0.0"
	}

	c.Server.IP = host
	c.Server.Port = port

	return nil
}
