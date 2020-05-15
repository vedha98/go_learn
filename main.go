package main

import (
	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/controllers"
	"github.com/vedha98/go_learn/middlewares"
	"github.com/vedha98/go_learn/models"
)

func initializeDatabase(r *gin.Engine) {
	db := models.SetupModels()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})
}

func addUserRoutes(r *gin.Engine) {
	r.POST("/users", controllers.CreateUser)
	r.POST("/login", controllers.LoginUser)
}

func addBookRoutes(r *gin.Engine) {
	r.GET("/books", middlewares.VerifyToken(), controllers.FindBooks)
	r.POST("/books", middlewares.VerifyToken(), controllers.CreateBook)
	r.GET("/books/:id", controllers.FindBook)
	r.PATCH("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id")
}

func main() {
	r := gin.Default()
	initializeDatabase(r)
	addUserRoutes(r)
	addBookRoutes(r)
	r.Run()
}
