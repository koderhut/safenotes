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
package webapp

import (
	"github.com/gorilla/mux"

	"github.com/koderhut/safenotes/internal/config"
)

// BootstrapServer configures the server according to options set
func BootstrapServer(cfg *config.Parameters, router *mux.Router) (Server, error) {
	var srv Server

	if cfg.Server.Https.Enable == true {
		srv, _ = newHttpsServer(cfg.Server, router)
	} else {
		srv, _ = newHttpServer(cfg.Server, router)
	}

	err := srv.ListenAndServe()

	return srv, err
}
