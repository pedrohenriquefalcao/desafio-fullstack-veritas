package main

import (
	"minikanban/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	servidor := gin.Default()
	servidor.Use(cors.Default())

	servidor.GET("/tasks", controller.BuscarTarefas)
	servidor.POST("/tasks", controller.CriarTarefa)
	servidor.PUT("/tasks/:id", controller.AtualizarTarefa)
	servidor.DELETE("/tasks/:id", controller.DeletarTarefa)

	servidor.Run(":8080")
}
