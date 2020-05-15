package models

import "github.com/jinzhu/gorm"

// Book Model
type Book struct {
	gorm.Model
	ID     uint   `json:"id" gorm:"primary_key"`
	Title  string `json:"title"`
	UserID int
	User   User `gorm:"ForeignKey:UserID"`
}
