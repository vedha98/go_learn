package controllers

import (
	"net/http"
	"unsafe"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/vedha98/go_learn/auth"
	"github.com/vedha98/go_learn/models"
)

type CreateUserInput struct {
	ID         uint   `json:"id" gorm:"primary_key"`
	Firstname  string `json:"firstname" binding:"required"`
	Lastname   string `json:"lastname" binding:"required"`
	NFirstname string `json:"nfirstname" binding:"required"`
	NLastname  string `json:"nlastname" binding:"required"`
	Password   string `json:"password" binding:"required"`
	AadharNo   string `json:"aadharNo" binding:"required"`
	PanNo      string `json:"panNo" binding:"required"`
	Email      string `json:"email" binding:"required"`
	DOB        string `json:"dob" binding:"required"`
	NDOB       string `json:"ndob" binding:"required"`
}
type LoginUserInput struct {
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required,gmail"`
}

func CreateUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusOK, gin.H{"error": err.Error()})
		return
	}
	user := (*models.User)(unsafe.Pointer(&input))
	db.Create(&user)
	// data := struct {
	// 	success bool
	// 	message string
	// }{
	// 	success: true,
	// 	message: "User Created Successfully"}
	c.JSON(http.StatusOK, gin.H{"success": true, "msg": "User Created Successfully"})
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
		c.JSON(http.StatusBadRequest, gin.H{"msg": "User not found!"})
		return
	}
	paswordMatch := user.VerifyPassword(input.Password)
	if paswordMatch {
		token, err := auth.CreateToken(user.ID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to Generate JWT!"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"user": user, "token": token, "success": true})
	}

}

func TokenLogin(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})
	var user models.User

	err := db.Where("id = ?", userId).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": "User not found!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user, "success": true, "msg": "Logged In Successfully"})
}
