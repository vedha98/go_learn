package main
import (
	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/models"
	"github.com/vedha98/go_learn/controllers"

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
	  r.GET("/books/:id", controllers.FindBook)
	  r.PATCH("/books/:id", controllers.UpdateBook)
	  r.DELETE("/books/:id")
  	r.Run()
}
