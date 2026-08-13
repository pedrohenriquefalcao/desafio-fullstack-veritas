package controller

import (
	"net/http"
	"strconv"

	"minikanban/model"

	"github.com/gin-gonic/gin"
)

var listaTarefas = []model.Tarefa{
	{ID: 1, Titulo: "Terminar MVP", Descricao: "Entregar o projeto finalizado", Status: "feito"},
	{ID: 2, Titulo: "Criar Tela", Descricao: "Configurar React", Status: "em progresso"},
	{ID: 3, Titulo: "Testar Funcionalidades", Descricao: "Realizar testes unitários", Status: "concluído"},
}
var proximoID = 4

func BuscarTarefas(c *gin.Context) {
	c.JSON(http.StatusOK, listaTarefas)
}

func CriarTarefa(c *gin.Context) {
	var novaTarefa model.Tarefa
	if err := c.ShouldBindJSON(&novaTarefa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": err.Error()})
		return
	}
	novaTarefa.ID = proximoID
	proximoID++
	listaTarefas = append(listaTarefas, novaTarefa)
	c.JSON(http.StatusCreated, novaTarefa)
}

func AtualizarTarefa(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "ID inválido"})
		return
	}
	var tarefaAtualizada model.Tarefa
	if err := c.ShouldBindJSON(&tarefaAtualizada); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": err.Error()})
		return
	}
	for i, t := range listaTarefas {
		if t.ID == id {
			listaTarefas[i].Titulo = tarefaAtualizada.Titulo
			listaTarefas[i].Descricao = tarefaAtualizada.Descricao
			listaTarefas[i].Status = tarefaAtualizada.Status
			c.JSON(http.StatusOK, listaTarefas[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"erro": "Tarefa não encontrada"})
}

func DeletarTarefa(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erro": "ID inválido"})
		return
	}
	for i, t := range listaTarefas {
		if t.ID == id {
			listaTarefas = append(listaTarefas[:i], listaTarefas[i+1:]...)
			c.JSON(http.StatusOK, gin.H{"mensagem": "Deletado com sucesso"})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"erro": "Tarefa não encontrada"})
}
