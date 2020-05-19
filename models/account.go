package models

// Book Model
type Account struct {
	// gorm.Model
	ID        uint   `json:"id" gorm:"primary_key"`
	AccountNo string `json:"AccountNo"`
	Balance   int    `json:"balance"`
	IsPrimary bool   `json:"IsPrimary"`
	UserID    int
	User      User `gorm:"ForeignKey:UserID"`
}
