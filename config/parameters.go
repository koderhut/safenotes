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
	IP           string
	Port         string
	Debug        bool
	ServerStatic bool
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
