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
	mail "github.com/xhit/go-simple-mail/v2"
)

type EmailHandler struct {
	conn *connection
}

// NewEmailHandler creates an instance of an EmailHandler
// In case the server config is not valid will return an error
func newEmailHandler(cfg EngineConfig) (Handler, error) {
	var conn = newConnection(cfg.Server, cfg.Auth, nil)

	// we validate the credentials before needing to send
	// any notifications. thus, we limit the error count to only 1 on boot
	if err := conn.Connect(); err != nil {
		return nil, err
	}
	defer conn.Close()

	return &EmailHandler{conn: conn}, nil
}

// Send used for sending an email notification
func (s *EmailHandler) Send(n Communique) error {
	conn, err := s.getConnection()
	if err != nil {
		return err
	}
	defer conn.Close() // we should always close the server connection

	message := mail.NewMSG()
	message.SetFrom(n.GetSender().String()).
		AddTo(n.GetRecipient().String()).
		SetSubject(n.GetSubject()).
		SetBody(mail.TextHTML, n.GetMessage()).
		SetPriority(mail.PriorityHigh)

	err = message.Send(conn.client)
	if err != nil {
		return err
	}

	return nil
}

// getConnection makes an SMTP connection
// in order to prepare for sending the email
func (s *EmailHandler) getConnection() (*connection, error) {
	err := s.conn.Connect()

	if err != nil {
		return &connection{}, err
	}

	return s.conn, nil
}
