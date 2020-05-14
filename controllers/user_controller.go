package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/vedha98/go_learn/auth"
	"github.com/vedha98/go_learn/models"
)

type CreateUserInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
type LoginUserInput struct {
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

func CreateUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user := models.User{Name: input.Name, Email: input.Email, Password: input.Password}
	db.Create(&user)

	c.JSON(http.StatusOK, gin.H{"data": user})
}
func LoginUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var input LoginUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user = models.User{}
	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	paswordMatch := user.VerifyPassword(input.Password)
	if paswordMatch {
		token, err := auth.CreateToken(user.ID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to Generate JWT!"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"user": user, "token": token})
	}

}
