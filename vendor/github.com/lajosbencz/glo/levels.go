package glo

// Level defines the severity
type Level uint16

// String formats the Level
func (l Level) String() string {
	l = levelSnap(l)
	return levelNames[l]
}

const (
	// Debug severity
	Debug Level = 100
	// Info severity
	Info Level = 200
	// Notice severity
	Notice Level = 250
	// Warning severity
	Warning Level = 300
	// Error severity
	Error Level = 400
	// Critical severity
	Critical Level = 500
	// Alert severity
	Alert Level = 550
	// Emergency severity
	Emergency Level = 600
)

// LevelList incrementally lists severities
var LevelList = []Level{
	Debug,
	Info,
	Notice,
	Warning,
	Error,
	Critical,
	Alert,
	Emergency,
}

// LevelNames maps a Level to a string
var levelNames = map[Level]string{
	Debug:     "DEBUG",
	Info:      "INFO",
	Notice:    "NOTICE",
	Warning:   "WARNING",
	Error:     "ERROR",
	Critical:  "CRITICAL",
	Alert:     "ALERT",
	Emergency: "EMERGENCY",
}

func levelSnap(in Level) Level {
	if in >= Emergency {
		return Emergency
	}
	if in >= Alert {
		return Alert
	}
	if in >= Critical {
		return Critical
	}
	if in >= Error {
		return Error
	}
	if in >= Warning {
		return Warning
	}
	if in >= Notice {
		return Notice
	}
	if in >= Info {
		return Info
	}
	return Debug
}
