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
	"github.com/koderhut/safenotes/internal/utilities/logs"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// envjsCmd represents the envjs command
var envjsCmd = &cobra.Command{
	Use:   "envjs",
	Short: "Dump environment configs",
	Long: `This command is used to dump to the file system 
environment configs for the front-end app (env.js) based on 
configuration passed to this application.
`,
	PreRun: func(cmd *cobra.Command, args []string) {
		if !viper.IsSet("output") {
			logs.Writer.Error(fmt.Sprintln("Missing output file"))
			os.Exit(1)
		}
	},

	Run: func(cmd *cobra.Command, args []string) {
		out := viper.GetString("output")
		force := viper.GetBool("force")

		logs.Writer.Info(fmt.Sprintf("Write config to: [%s]", out))

		_, err := os.Stat(out)

		if !os.IsNotExist(err) && !force {
			logs.Writer.Info(fmt.Sprintf("File [%s] already exists! Please use -f if you want to overwrite it!", out))
		}

		file, err := os.Create(out)
		checkErr(err)

		defer file.Close()

		_, err = file.WriteString(viper.GetString("server.static-site.envjs"))
		checkErr(err)
	},
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func init() {
	dumpCmd.AddCommand(envjsCmd)

	envjsCmd.Flags().BoolP("force", "f", false, "Forcefully overwrite the output file if it exists")

	_ = viper.BindPFlags(envjsCmd.Flags())
}
