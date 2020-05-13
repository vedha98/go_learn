package main

import (
	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/controllers"
	"github.com/vedha98/go_learn/models"
)

func main() {
	r := gin.Default()
	db := models.SetupModels()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})
	r.GET("/books", controllers.FindBooks)
	r.POST("/books", controllers.CreateBook)
	r.POST("/users", controllers.CreateUser)
	r.GET("/books/:id", controllers.FindBook)
	r.PATCH("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id")
	r.Run()
}
