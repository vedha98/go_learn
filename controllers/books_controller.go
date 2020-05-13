package controllers

import (
	"net/http"

	"github.com/jinzhu/gorm"
  "github.com/gin-gonic/gin"
  "github.com/vedha98/go_learn/models"

)

type CreateBookInput struct {
  Title  string `json:"title" binding:"required"`
  Author string `json:"author" binding:"required"`
}
type UpdateBookInput struct {
  Title  string `json:"title"`
  Author string `json:"author"`
}
func FindBooks(c *gin.Context) {
  db := c.MustGet("db").(*gorm.DB)

  var books []models.Book
  db.Find(&books)

  c.JSON(http.StatusOK, gin.H{"data": books})
}

func FindBook(c *gin.Context) {
  db := c.MustGet("db").(*gorm.DB)
  var book models.Book
  err := db.Where("id = ?", c.Param("id")).First(&book).Error
  if  err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
    return
  }

  c.JSON(http.StatusOK, gin.H{"data": book})
}

func CreateBook(c *gin.Context) {
  db := c.MustGet("db").(*gorm.DB)
  var input CreateBookInput
  if err := c.ShouldBindJSON(&input); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
  }
  book := models.Book{Title: input.Author, Author: input.Author}
  db.Create(&book)

  c.JSON(http.StatusOK, gin.H{"data": book})
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