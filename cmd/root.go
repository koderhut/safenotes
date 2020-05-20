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
	"os"
	"strings"

	homedir "github.com/mitchellh/go-homedir"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/koderhut/safenotes/internal/config"
	"github.com/koderhut/safenotes/internal/utilities/logs"
)

var (
	cfgFile string
	cfg *config.Parameters = config.NewConfigParams()
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "safenotes",
	Short: "Self-hosted safe notes sharing",
	Long: ``,
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		err := viper.Unmarshal(&cfg)
		if err != nil {
			logs.Writer.Critical("unable to decode into struct, %v", err)
		}
		logs.UpdateStdIoHandler(cfg.Verbose)
	},

}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		_ = logs.Writer.Critical(err.Error())
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	viper.SetEnvPrefix("SN")
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "__", "-", "_"))

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", ".safenotes.yaml", "Use specific config file")
	rootCmd.PersistentFlags().BoolVarP(&cfg.Verbose, "verbose", "v", false, "Display debug messages")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		if err != nil {
			logs.Writer.Critical(err.Error())
			os.Exit(1)
		}

		viper.AddConfigPath(".")
		// Search config in home directory with name ".safenotes" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".safenotes")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		message := fmt.Sprintf("Using config file: %s", viper.ConfigFileUsed())
		logs.Writer.Info(message)
		return
	}

	logs.Writer.Alert("Unable to find a config file! Running on defaults!")
}
