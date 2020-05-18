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
	authorized := r.Group("/")
	authorized.Use(middlewares.VerifyToken())
	authorized.GET("/books", controllers.FindBooks)
	authorized.POST("/books", controllers.CreateBook)
	authorized.GET("/books/:id", controllers.FindBook)
	authorized.PATCH("/books/:id", controllers.UpdateBook)
	authorized.DELETE("/books/:id")
}

func main() {
	r := gin.Default()
	initializeDatabase(r)
	addUserRoutes(r)
	addBookRoutes(r)
	r.Run()
}
