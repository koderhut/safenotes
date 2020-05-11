package stats

type Stats struct {
	Total   uint
	Current uint
}

func New() *Stats {
	return &Stats{Total: 0, Current: 0}
}

func (s *Stats) Inc() {
	s.Total++
	s.Current++
}

func (s *Stats) Decr() {
	s.Current--
}