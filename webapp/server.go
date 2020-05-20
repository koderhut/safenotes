package webapp

import (
	"github.com/gorilla/mux"

	"github.com/koderhut/safenotes/internal/config"
)


//
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
