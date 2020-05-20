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
package cmd

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/olekukonko/tablewriter"
	"github.com/spf13/cobra"

	"github.com/koderhut/safenotes/note"
	"github.com/koderhut/safenotes/staticsite"
	"github.com/koderhut/safenotes/webapp"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the webservice server",
	Long: `Start a HTTP(s) server that will both provide the front-end and
expose the API endpoints for the service
	`,


	Run: func(cmd *cobra.Command, args []string) {
		wait := time.Second * 15
		apiRoutes := []webapp.WebRouting{note.NewWebApi()}
		rootRoutes := []webapp.WebRouting{}

		if cfg.StaticSite.Serve == true {
			rootRoutes = append(rootRoutes, staticsite.NewHandler(cfg.StaticSite))
		}

		router := webapp.BootstrapRouter(cfg, apiRoutes, rootRoutes)
		srv, err := webapp.BootstrapServer(cfg, router)

		if err != nil {
			log.Panic(err)
			os.Exit(1)
		}

		log.Printf(">>> memory-notes web service is ready to receive requests on: [%s]\n", srv.GetListeningAddr())

		debugMode(router)

		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, os.Kill)

		<-c

		ctx, cancel := context.WithTimeout(context.Background(), wait)
		defer cancel()
		srv.Shutdown(ctx)

		log.Println(">>> memory-notes web service has shutdown")

		os.Exit(0)
	},
}

func debugMode(router *mux.Router) {
	if "debug" != cfg.Server.Verbosity {
		return
	}

	log.Printf("*** Registered routes ****")
	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Route", "Methods", "Name"})

	router.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		routePath, _ := route.GetPathTemplate()
		methods, _ := route.GetMethods()

		table.Append([]string{routePath, strings.Join(methods, ", "), route.GetName()})

		return nil
	})
	table.Render()
	log.Printf("***\n")
}

func init() {
	serveCmd.Flags().Bool("ssl", false, "Enable HTTPS")

	rootCmd.AddCommand(serveCmd)
}
