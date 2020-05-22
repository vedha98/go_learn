package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func SetupModels() *gorm.DB {
	db, err := gorm.Open("mysql", "root:root@/go_learn?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic("Failed to connect to database!")
	}
	// db.DB().SetMaxIdleConns(0)
	db.DB().SetMaxOpenConns(100)
	// db.LogMode(true)
	db.AutoMigrate(&User{}, &Book{}, &Category{}, &Account{}, &Transaction{})

	return db
}
