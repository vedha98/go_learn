package models

import "github.com/jinzhu/gorm"

// Transaction Model
type Transaction struct {
	gorm.Model
	// ID          uint    `json:"id" gorm:"primary_key"`
	Amount      int     `json:"amount"`
	FromID      int     `json:"fromid"`
	ToID        int     `json:"toid"`
	FromNo      string  `json:"fromno"`
	ToNo        string  `json:"tono"`
	FromAccount Account `gorm:"foreignkey:fromID"`
	ToAccount   Account `gorm:"foreignkey:toID"`
}
