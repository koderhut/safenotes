package webapp

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/koderhut/safenotes/config"
)

func BootstrapServer(cfg config.Parameters, router *mux.Router) *http.Server {
	addr, _ := cfg.Addr()

	srv := &http.Server{
		Addr: addr,
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      router,
	}

	// Run our server in a goroutine so that it doesn't block.
	go func() {
		err := srv.ListenAndServe()
		if  err != nil && err.Error() != "http: Server closed" {
			log.Println(err)
			os.Exit(128)
		}
	}()

	return srv
}


