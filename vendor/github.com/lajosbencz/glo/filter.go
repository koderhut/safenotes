package glo

// Filter checks a log line against custom logic
type Filter interface {
	Check(Level, string, ...interface{}) bool
}

// NewFilterLevel checks the level of the log (inclusive)
func NewFilterLevel(min Level) Filter {
	return &filterLevel{min}
}

// NewFilterLevelRange checks if the level of the log is in a range (inclusive)
func NewFilterLevelRange(min, max Level) Filter {
	if min > max {
		t := max
		max = min
		min = t
	}
	return &filterLevelRange{min, max}
}

type filterLevel struct {
	level Level
}

func (v *filterLevel) Check(level Level, line string, params ...interface{}) bool {
	return level >= v.level
}

type filterLevelRange struct {
	min Level
	max Level
}

func (v *filterLevelRange) Check(level Level, line string, params ...interface{}) bool {
	return level >= v.min && level <= v.max
}
