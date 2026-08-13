package model

type Tarefa struct {
	ID        int    `json:"id"`
	Titulo    string `json:"titulo"`
	Descricao string `json:"descricao"`
	Status    string `json:"status"`
}
