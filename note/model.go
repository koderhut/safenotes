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
	"time"

	"github.com/google/uuid"
)

// Note type used for defining a note
type Note struct {
	ID      uuid.UUID
	Content string
	Date    time.Time
}

const (
	EXPIRE_ON_READ    = "on-read"
	EXPIRE_AFTER_30M  = "30m"
	EXPIRE_AFTER_1H   = "1h"
	EXPIRE_AFTER_1DAY = "24h"
	EXPIRE_AFTER_2DAY = "48h"
	EXPIRE_AFTER_7DAY = "168h"
)
