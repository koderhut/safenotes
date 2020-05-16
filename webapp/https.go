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

	"github.com/koderhut/safenotes/config"
)

// HttpsServer A representation of a HTTP server that routes all traffic to the HTTPS server
// serving the API and possibly the static app
type HttpsServer struct {
	Server

	srv []*http.Server
}

func newHttpsServer(cfg config.ServerParams, router *mux.Router) (Server, error) {
	httpAddr, err := cfg.ListeningAddr()
	if err != nil {
		return nil, err
	}

	httpsAddr, err := cfg.HTTPSListeningAddr()
	if err != nil {
		return nil, err
	}

	// build a HTTP server that would redirect to HTTPS and that is all
	httpSrv := &http.Server{
		Addr: httpAddr,
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      http.RedirectHandler(cfg.Https.RedirectTo, http.StatusMovedPermanently),
	}

	// configure the HTTPS server
	httpsSrv := &http.Server{
		Addr: httpsAddr,
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
	crt, err := ioutil.ReadFile(cfg.Crt)
	if err != nil {
		log.Fatal(err)
	}

	key, err := ioutil.ReadFile(cfg.Key)
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
