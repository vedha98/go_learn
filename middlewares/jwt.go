package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/auth"
)

func VerifyToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, err := auth.ExtractTokenID(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}
		c.Set("userId", userId)
		c.Next()
	}
}
