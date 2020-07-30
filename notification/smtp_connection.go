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

package notification

import (
	"crypto/tls"
	"errors"
	"time"

	mail "github.com/xhit/go-simple-mail/v2"
)

type connection struct {
	client *mail.SMTPClient
	addr   string
	tlsCfg *tls.Config
	auth   Auth
	closed bool
}

// newConnection create a new connection instance
func newConnection(addr string, auth Auth, client *mail.SMTPClient) *connection {
	return &connection{
		client: client,
		addr:   addr,
		auth:   auth,
		closed: true,
	}
}

// Connect connects to the SMTP server and
// performs the auth necessary
func (c *connection) Connect() error {
	var err error

	if c.client != nil && c.closed == false{
		return nil // we are already connected; no need to continue
	}

	client := mail.NewSMTPClient()
	client.Host = c.addr
	client.Port = 587
	client.Username = c.auth.User
	client.Password = c.auth.Pass
	client.Encryption = mail.EncryptionTLS
	client.KeepAlive = false
	client.ConnectTimeout = 10 * time.Second
	client.SendTimeout = 10 * time.Second

	smtpClient, err := client.Connect()
	if err != nil {
		return err
	}

	c.client = smtpClient

	return nil
}

// Close the active connection to the server
func (c *connection) Close() error {
	if c.client == nil {
		return nil  // if there is no client there is nothing to close
	}

	_ = c.client.Quit()

	// we set here the object to nil
	// because there is no way for us to know
	// if the connect
	c.closed = true

	return nil
}

// GetClient return the client when it is connected
// Otherwise return an error if the client has not connected to the server
func (c *connection) GetClient() (*mail.SMTPClient, error) {
	if c.client == nil {
		return nil, errors.New("the client has not been initialized")
	}

	return c.client, nil
}
