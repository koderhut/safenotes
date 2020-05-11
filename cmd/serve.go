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
	"github.com/koderhut/safenotes/static"
	"github.com/koderhut/safenotes/staticsite"
	"log"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/mux"
	"github.com/koderhut/safenotes/config"
	"github.com/koderhut/safenotes/note"
	"github.com/koderhut/safenotes/webapp"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var cfg config.Parameters

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the webservice server",
	Long: `Start a HTTP(s) server that will both provide the front-end and
expose the API endpoints for the service
	`,


	Run: func(cmd *cobra.Command, args []string) {
		wait :=  time.Second * 15
		webRoutes := []webapp.WebRouting{note.NewWebApi()}

		if cfg.Server.ServerStatic {
			webRoutes = append(webRoutes, staticsite.NewHandler())
		}

		router := webapp.BootstrapRouter(&cfg, webRoutes...)
		srv := webapp.BootstrapServer(cfg, router)

		log.Printf(">>> memory-notes web service is ready to receive requests on: [%s:%s]\n", viper.GetString("server.ip"), viper.GetString("server.port"))

		if cfg.Server.Debug {
			go func() {
				log.Printf("*** Registered routes ****")
				router.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
					routePath, _ := route.GetPathTemplate()
					methods, _ := route.GetMethods()

					log.Printf("Route: %s \t Methods: %s\n", routePath, methods)

					return nil
				})
				log.Printf("*******")
			}()
		}

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

func init() {
	rootCmd.AddCommand(serveCmd)

	// Here you will define your flags and configuration settings.
	//serveCmd.Flags().StringP("server.ip", "i", "0.0.0.0", "IP address for the server to listen to")
	//serveCmd.Flags().IntP("server.port", "p", 44666, "Port to run application server on")
	//
	//viper.BindPFlags(serveCmd.Flags())
}
