package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/controllers"
	"github.com/vedha98/go_learn/middlewares"
	"github.com/vedha98/go_learn/models"
	"github.com/vedha98/go_learn/services"
)

func initializeDatabase(r *gin.Engine) {
	db := models.SetupModels()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})
}

func addUserRoutes(r *gin.Engine) {
	r.POST("/api/users/register", controllers.CreateUser)
	r.POST("/api/users/login", controllers.LoginUser)
	r.GET("/api/users/tokenlogin", middlewares.VerifyToken(), controllers.TokenLogin)
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
	services.InitiateValidators()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
	}))
	addUserRoutes(r)
	addBookRoutes(r)
	r.Run(":8000")
}
