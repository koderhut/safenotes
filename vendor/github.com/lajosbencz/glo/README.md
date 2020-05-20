[![GoDoc](https://godoc.org/github.com/lajosbencz/glo?status.svg)](https://godoc.org/github.com/lajosbencz/glo)
[![Go Report Card](https://goreportcard.com/badge/github.com/lajosbencz/glo)](https://goreportcard.com/report/github.com/lajosbencz/glo)
[![codecov](https://codecov.io/gh/lajosbencz/glo/branch/master/graph/badge.svg)](https://codecov.io/gh/lajosbencz/glo)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/696a39293abd4f42b3f749c8b022a039)](https://app.codacy.com/app/lajosbencz/glo)
[![Build Status](https://travis-ci.com/lajosbencz/glo.svg?branch=master)](https://travis-ci.com/lajosbencz/glo.svg?branch=master)

# GLO

## Logging library for Golang

Inspired by Monolog for PHP, severity levels are identical

### Install

```bash
go get github.com/lajosbencz/glo
```

### Severity levels

```bash
Debug     = 100
Info      = 200
Notice    = 250
Warning   = 300
Error     = 400
Critical  = 500
Alert     = 550
Emergency = 600
```

### Simple example

```go
package main

import "github.com/lajosbencz/glo"

func main() {
	// Info - Warning will go to os.Stdout
	// Error - Emergency will go to os.Stderr
	log := glo.NewStdFacility()

	// goes to os.Stdout
	log.Debug("Detailed debug line: %#v", map[string]string{"x": "foo", "y": "bar"})

	// goes to os.Stderr
	log.Error("Oooof!")
}
```

Output:

```bash
2019-01-22T15:16:08+01:00 [DEBUG] Detailed debug line [map[x:foo y:bar]]
2019-01-22T15:16:08+01:00 [ERROR] Oooof! []
```

### Customized example

```go
package main

import (
	"bytes"
	"fmt"
	"os"
	"strings"

	"github.com/lajosbencz/glo"
)

func main() {
	log := glo.NewFacility()

	// write everything to a buffer
	bfr := bytes.NewBufferString("")
	handlerBfr := glo.NewHandler(bfr)
	log.PushHandler(handlerBfr)

	// write only errors and above using a short format
	handlerStd := glo.NewHandler(os.Stdout)
	formatter := glo.NewFormatter("{L}: {M}")
	filter := glo.NewFilterLevel(glo.Error)
	handlerStd.SetFormatter(formatter)
	handlerStd.PushFilter(filter)
	log.PushHandler(handlerStd)

	fmt.Println("Log output:")
	fmt.Println(strings.Repeat("=", 70))
	log.Info("Only written to the buffer")
	log.Alert("Written to both buffer and stdout")

	fmt.Println("")
	fmt.Println("Buffer contents:")
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println(bfr.String())
}
```

Output:

```bash
Log output:
======================================================================
ALERT: Written to both buffer and stdout []

Buffer contents:
======================================================================
2019-01-22T15:14:16+01:00 [INFO] Only written to the buffer []
2019-01-22T15:14:16+01:00 [ALERT] Written to both buffer and stdout []
```

### Custom filter

```go
package main

import (
	"os"
	"regexp"

	"github.com/lajosbencz/glo"
)

func main() {
	handler := glo.NewHandler(os.Stdout)
	filterEmptyLines := &filterRgx{regexp.MustCompile(`^.+$`)}
	handler.PushFilter(filterEmptyLines)

	log := glo.NewFacility()
	log.PushHandler(handler)

	log.Debug("", "format is empty, should be ignored")
	log.Debug("only this should appear at the output")
}

type filterRgx struct {
	rgx *regexp.Regexp
}

func (f *filterRgx) Check(level glo.Level, line string, params ...interface{}) bool {
	return f.rgx.MatchString(line)
}
```

Output:

```bash
2019-01-22T15:30:23+01:00 [DEBUG] only this should appear at the output
```
