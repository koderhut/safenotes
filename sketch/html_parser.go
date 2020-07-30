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

package sketch

import (
	"fmt"
	html "html/template"
	"io"
	"path"
)

type htmlParser struct {
	funcs html.FuncMap
}

func HTMLParser(funcs RenderFuncs) Parser  {
	f := make(html.FuncMap, 1)

	f["generateLink"] = func(uuid string) string {
		return fmt.Sprintf(funcs["generatelink"], uuid)
	}

	return &htmlParser{
		funcs: f,
	}
}

// Render renders a html template
func (p *htmlParser) Render(w io.Writer, f templateFile, vars interface{}) error {
	engine := html.New(path.Base(f))
	engine.Funcs(p.funcs)

	tpl, err := engine.ParseFiles(f)
	if err != nil {
		return err
	}

	return tpl.Execute(w, vars)
}

