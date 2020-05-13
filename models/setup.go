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

	db.AutoMigrate(&Book{}, &User{})

	return db
}
