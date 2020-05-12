package models

import (
	"github.com/jinzhu/gorm"
)
// Book Model
type Book struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	Title  string `json:"title"`
	Author string `json:"author"`
  }