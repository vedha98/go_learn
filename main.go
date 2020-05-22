package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/config"
	"github.com/vedha98/go_learn/controllers"
	"github.com/vedha98/go_learn/middlewares"
	"github.com/vedha98/go_learn/services"
)

func addUserRoutes(r *gin.Engine) {
	r.POST("/api/users/register", controllers.CreateUser)
	r.POST("/api/users/login", controllers.LoginUser)
	r.GET("/api/users/tokenlogin", middlewares.VerifyToken(), controllers.TokenLogin)
}
func addAccountRoutes(r *gin.Engine) {
	r.POST("/api/accounts/createacc", middlewares.VerifyToken(), controllers.CreateAccount)
	r.POST("/api/transfer/addmoney", middlewares.VerifyToken(), controllers.AddMoney)
	r.POST("/api/transfer/sendmoney", middlewares.VerifyToken(), controllers.SendMoney)
	r.GET("/api/transfer/gettransactions/:page", middlewares.VerifyToken(), controllers.GetTransactions)
	r.GET("/api/accounts/getaccounts", middlewares.VerifyToken(), controllers.GetAccounts)

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
	config.InitializeDatabase(r)
	services.InitiateValidators()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
	}))
	r.Use(middlewares.BodyLogMiddleware())
	addUserRoutes(r)
	addBookRoutes(r)
	addAccountRoutes(r)
	r.Run(":8000")
}
