package models

// Book Model
type Book struct {
	// gorm.Model
	ID         uint   `json:"id" gorm:"primary_key"`
	Title      string `json:"title"`
	UserID     int
	User       User       `gorm:"ForeignKey:UserID"`
	Categories []Category `gorm:"many2many:book_categories"`
}
