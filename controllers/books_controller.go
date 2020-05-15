package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/vedha98/go_learn/models"
)

type CreateBookInput struct {
	Title string `json:"title" binding:"required"`
}
type UpdateBookInput struct {
	Title string `json:"title"`
}

func FindBooks(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})

	var books []models.Book
	db.Preload("User").Find(&books)

	c.JSON(http.StatusOK, gin.H{"data": books, "userId": userId})
}

func FindBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var book models.Book
	err := db.Where("id = ?", c.Param("id")).First(&book).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": book})
}

func CreateBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})
	var user models.User
	err := db.Where("id = ?", userId).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	var input CreateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	book := models.Book{Title: input.Title}
	db.Model(&user).Association("Books").Append(book)
	c.JSON(http.StatusOK, gin.H{"data": user})
}

func UpdateBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	// Get model if exist
	var book models.Book
	if err := db.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input UpdateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Model(&book).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": book})
}

func DeleteBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	// Get model if exist
	var book models.Book
	if err := db.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&book)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
