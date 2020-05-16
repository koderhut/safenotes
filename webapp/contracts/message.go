package contracts

type InputMessage struct {
	Content      string `json:"content"`
	NotifyOnRead string `json:"notify-read"`
	Recipient    string `json:"notify-recipient"`
}

type LinkMessage struct {
	Status bool   `json:"complete"`
	Link   string `json:"link"`
	Id     string `json:"note-id"`
}

type ContentMessage struct {
	Status  bool   `json:"complete"`
	Content string `json:"content"`
}

type ErrorMessage struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
}

type StatsMessage struct {
	Status      bool `json:"status"`
	StoredNotes uint `json:"stored-notes"`
	TotalNotes  uint `json:"total-notes"`
}
