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
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"

	"github.com/koderhut/safenotes/config"
)

// HttpServer A representation of a simple HTTP server
type HttpServer struct {
	Server

	srv *http.Server
}

// newHttpServer boots the server and attaches the mux.Router to configured port
func newHttpServer(cfg config.ServerParams, router *mux.Router) (Server, error) {
	addr, err := cfg.ListeningAddr()

	if err != nil {
		return nil, err
	}

	srv := &http.Server{
		Addr: addr,
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      router,
	}

	httpSrv := &HttpServer{srv: srv}

	return httpSrv, nil
}

// ListenAndServe puts the server in listening mode
func (http HttpServer) ListenAndServe() error {
	// Run our server in a goroutine so that it doesn't block.
	go func() {
		err := http.srv.ListenAndServe()
		if  err != nil && err.Error() != "http: Server closed" {
			log.Println(err)
			os.Exit(128)
		}
	}()

	return nil
}

// Shutdown the server
func (http HttpServer) Shutdown(ctx context.Context) error {
	return http.srv.Shutdown(ctx)
}

// GetListeningAddr Get th  IP:Port that the server has registered
func (http HttpServer) GetListeningAddr() string  {
	return http.srv.Addr
}
