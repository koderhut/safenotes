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
	"crypto/tls"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"

	"github.com/koderhut/safenotes/internal/config"
)

// HttpsServer A representation of a HTTP server that routes all traffic to the HTTPS server
// serving the API and possibly the static app
type HttpsServer struct {
	Server

	srv []*http.Server
}

func newHttpsServer(cfg config.ServerParams, router *mux.Router) (Server, error) {

	// build a HTTP server that would redirect to HTTPS and that is all
	httpSrv := &http.Server{
		Addr: cfg.ListeningAddr(),
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      http.RedirectHandler(cfg.Https.RedirectTo, http.StatusMovedPermanently),
	}

	// configure the HTTPS server
	httpsSrv := &http.Server{
		Addr: cfg.HTTPSListeningAddr(),
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler: router,
		TLSConfig: prepareTlS(cfg.Https),
	}

	https := &HttpsServer{
		srv: []*http.Server{httpSrv, httpsSrv},
	}

	return https, nil
}


func (https HttpsServer) ListenAndServe() error {
	httpSrv, httpsSrv := https.srv[0], https.srv[1]

	// Run our server in a goroutine so that it doesn't block.
	go func() {
		err := httpSrv.ListenAndServe()
		if  err != nil && err.Error() != "http: Server closed" {
			log.Println(err)
			os.Exit(128)
		}
	}()

	// Run our server in a goroutine so that it doesn't block.
	go func() {
		err := httpsSrv.ListenAndServeTLS("", "")
		if  err != nil && err.Error() != "http: Server closed" {
			log.Println(err)
			os.Exit(128)
		}
	}()

	return nil
}

func (https HttpsServer) Shutdown(ctx context.Context) error {
	var errCollector []string
	var err error
	isError := false

	for _, srv := range https.srv {
		log.Printf("Shutting down server: [%s]", srv.Addr)
		err = srv.Shutdown(ctx)

		if err != nil {
			errCollector = append(errCollector, err.Error())
			isError = true
		}
	}

	if isError {
		return errors.New(strings.Join(errCollector, "\n"))
	}

	return nil
}

// Get a list of IP:Port that the servers have registered
func (https HttpsServer) GetListeningAddr() string  {
	var addrs []string

	for _, srv := range https.srv {
		addrs = append(addrs, srv.Addr)
	}

	return strings.Join(addrs, ",")
}

// prepareTLS config for the HTTPS server
func prepareTlS(cfg config.Https) *tls.Config {
	crt, err := ioutil.ReadFile(cfg.Cert)
	if err != nil {
		log.Fatal(err)
	}

	key, err := ioutil.ReadFile(cfg.CertKey)
	if err != nil {
		log.Fatal(err)
	}

	cert, err := tls.X509KeyPair(crt, key)
	if err != nil {
		log.Fatal(err)
	}

	return &tls.Config{
		Certificates: []tls.Certificate{cert},
		ServerName:   cfg.ServerName,
	}
}
