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
	"fmt"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the webservice",
	Long: `Start a HTTP(s) server that will both provide the front-end and
expose the API endpoints for the service
	`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("serve called")
		fmt.Printf(viper.GetString("server::ip"))
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Here you will define your flags and configuration settings.
	serveCmd.Flags().String("ip", "0.0.0.0", "IP address for the server to listen to")
	serveCmd.Flags().Int("port", 44666, "Port to run application server on")

	viper.BindPFlag("server::ip", serveCmd.Flags().Lookup("ip"))
	viper.BindPFlag("server::port", serveCmd.Flags().Lookup("port"))
}
