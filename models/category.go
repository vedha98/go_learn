package models

type Category struct {
	// gorm.Model
	ID    uint   `json:"id" gorm:"primary_key"`
	Name  string `json:"name" gorm:"unique"`
	Books []Book `gorm:"many2many:book_categories"`
}
