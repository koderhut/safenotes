package webapp

import "github.com/gorilla/mux"

type WebRouting interface {
	RegisterRoutes(r *mux.Router)
}
