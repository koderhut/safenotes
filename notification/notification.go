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

const NoReplyAddr = "no-reply@safenotes.com"

type Notification struct {
	recipient *Id
	sender    *Id
	subject   string
	message   string
	handler   Handler
}

type NotifyOption func(*Notification)

func (n *Notification) GetRecipient() Identity {
	return n.recipient
}

func (n *Notification) GetSender() Identity {
	return n.sender
}

func (n Notification) GetMessage() string {
	return n.message
}

func (n Notification) GetSubject() string {
	return n.subject
}

func (n Notification) Send() error {
	return n.handler.Send(&n)
}

func NewNotification(opts ...NotifyOption) *Notification  {
	const (
		defaultMessage = "Notification"
		defaultSubject = "Notification subject"
	)

	n := &Notification{
		recipient: &Recipient{Addr: NoReplyAddr},
		sender:    &Sender{Addr: NoReplyAddr},
		subject:   defaultSubject,
		message:   defaultMessage,

		handler:   handler,
	}

	for _, opt := range opts {
		opt(n)
	}

	return n
}

// ToRecipient adds a recipient to the notification
func ToRecipient(recipient string) NotifyOption {
	return func(n *Notification) {
		n.recipient = &Recipient{Addr: recipient}
	}
}

// FromSender adds a sender to the notification
func FromSender(sender string) NotifyOption {
	return func(n *Notification) {
		n.sender = &Sender{Addr: sender}
	}
}

// WithSubject adds a subject to the notifications
func WithSubject(subject string) NotifyOption {
	return func(n *Notification) {
		n.subject = subject
	}
}

// WithMessage adds the notification message
func WithMessage(message string) NotifyOption {
	return func(n *Notification) {
		n.message = message
	}
}
