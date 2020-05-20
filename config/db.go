package config

import (
	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/models"
)

func InitializeDatabase(r *gin.Engine) {
	db := models.SetupModels()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})
}
