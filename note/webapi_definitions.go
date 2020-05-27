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
package note

import (
	"fmt"
	"gopkg.in/go-playground/validator.v9"
)

// InputMessage is an API representation of incoming note data and options
type InputMessage struct {
	Content    string `json:"content" validate:"required,min=1"`
	AutoExpire string `json:"auto-expire,omitempty" validate:"omitempty,expire-interval"`
}

// InputMessage.IsValid is used to validate data passed from the client
func (in *InputMessage) IsValid() (bool, []string) {
	v := validator.New()
	v.RegisterAlias("expire-interval", "oneof=on-read 30m 1h 24h 48h 168h")
	err := v.Struct(in)

	if err == nil {
		return true, make([]string, 0)
	}

	var failed []string
	for _, errs := range err.(validator.ValidationErrors) {
		failed = append(failed, fmt.Sprintf("invalid input for: [%s/%s] with value: [%v]", errs.Namespace(), errs.Tag(), errs.Value()))
	}

	return false, failed
}

func (in *InputMessage) IsAutoExpire() bool {
	switch in.AutoExpire {
	case EXPIRE_AFTER_30M,
		EXPIRE_AFTER_1H,
		EXPIRE_AFTER_1DAY,
		EXPIRE_AFTER_2DAY,
		EXPIRE_AFTER_7DAY:
		return true
	default:
		return false
	}
}

// LinkMessage is an API representation of successful storage of note and options
type LinkMessage struct {
	Status bool   `json:"complete"`
	Id     string `json:"note-id"`
}

// ContentMessage is an API representation of note content stored
type ContentMessage struct {
	Status  bool   `json:"complete"`
	Content string `json:"content"`
}
