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
	"bytes"
	"context"
	"fmt"
	"os"
	"os/signal"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/lajosbencz/glo"
	"github.com/olekukonko/tablewriter"
	"github.com/spf13/cobra"

	"github.com/koderhut/safenotes/events"
	"github.com/koderhut/safenotes/internal/utilities/logs"
	"github.com/koderhut/safenotes/note"
	"github.com/koderhut/safenotes/notification"
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
		evStream := events.NewBroker()
		apiRoutes := []webapp.WebRouting{note.NewWebApi(note.NewMemoryRepo(), evStream)}
		rootRoutes := make([]webapp.WebRouting, 0)

		if cfg.StaticSite.Serve == true {
			rootRoutes = append(rootRoutes, staticsite.NewHandler(cfg.StaticSite))
		}

		router := webapp.BootstrapRouter(cfg, apiRoutes, rootRoutes)
		srv, err := webapp.BootstrapServer(cfg, router)

		if err != nil {
			logs.Writer.Critical(err.Error())
			os.Exit(1)
		}

		logErr(notification.ConfigureHandler(cfg.Notifications))
		logErr(note.InitSketch(cfg.Sketch))
		printRegisteredRoutes(router)

		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, os.Kill)

		if err = notification.ConfigureHandler(cfg.Notifications); err != nil {
			logs.Writer.Warning(err.Error())
		}

		note.RegisterSubscribers(evStream)

		logs.Writer.Info(fmt.Sprintf(">>> memory-notes web service is ready to receive requests on: [%s]", srv.GetListeningAddr()))
		<-c

		ctx, cancel := context.WithTimeout(context.Background(), wait)
		defer cancel()
		_ = srv.Shutdown(ctx)

		logs.Writer.Info(fmt.Sprintf(">>> memory-notes web service has shutdown"))

		os.Exit(0)
	},
}

func logErr(err error) {
	if err != nil {
		logs.Writer.Error(err.Error())
	}
}

func printRegisteredRoutes(router *mux.Router) {
	buf := bytes.Buffer{}
	p := strings.Repeat("*", 10)
	buf.WriteString(fmt.Sprintf("%s %s %s\n", p, "Registered routes", p))
	table := tablewriter.NewWriter(&buf)
	table.SetHeader([]string{"Route", "Methods", "Name"})

	_ = router.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		routePath, _ := route.GetPathTemplate()
		methods, _ := route.GetMethods()

		table.Append([]string{routePath, strings.Join(methods, ", "), route.GetName()})

		return nil
	})
	table.Render()
	logs.LogBuffer(glo.Debug, buf)
}

func init() {
	serveCmd.Flags().Bool("ssl", false, "Enable HTTPS")

	rootCmd.AddCommand(serveCmd)
}
