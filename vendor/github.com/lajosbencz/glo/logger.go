package glo

// Logger logs a line with a specific level
type Logger interface {
	Log(Level, string, ...interface{}) error
}

// LoggerSeverity includes all levels
type LoggerSeverity interface {
	Logger
	LoggerDebug
	LoggerInfo
	LoggerNotice
	LoggerWarning
	LoggerError
	LoggerCritical
	LoggerAlert
	LoggerEmergency
}

// LoggerDebug logs a debug line
type LoggerDebug interface {
	Debug(string, ...interface{}) error
}

// LoggerInfo logs an info line
type LoggerInfo interface {
	Info(string, ...interface{}) error
}

// LoggerNotice logs a notice line
type LoggerNotice interface {
	Notice(string, ...interface{}) error
}

// LoggerWarning logs a warning line
type LoggerWarning interface {
	Warning(string, ...interface{}) error
}

// LoggerError logs an error line
type LoggerError interface {
	Error(string, ...interface{}) error
}

// LoggerCritical logs a critical line
type LoggerCritical interface {
	Critical(string, ...interface{}) error
}

// LoggerAlert logs an alert line
type LoggerAlert interface {
	Alert(string, ...interface{}) error
}

// LoggerEmergency logs an emergency line
type LoggerEmergency interface {
	Emergency(string, ...interface{}) error
}
