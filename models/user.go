package models

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	// gorm.Model
	ID         uint      `json:"id" gorm:"primary_key"`
	Firstname  string    `json:"firstname"`
	Lastname   string    `json:"lastname"`
	NFirstname string    `json:"nfirstname"`
	NLastname  string    `json:"nlastname"`
	Password   string    `json:"-"`
	AadharNo   string    `json:"aadharNo"`
	PanNo      string    `json:"panNo"`
	Email      string    `json:"email"`
	DOB        string    `json:"dob"`
	NDOB       string    `json:"ndob"`
	Accounts   []Account `json:"accounts"`
}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func (u *User) VerifyPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	if err != nil {
		log.Println(err)
		return false
	}

	return true
}

func (u *User) BeforeSave() error {
	hashedPassword, err := Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}
