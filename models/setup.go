package models

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
  "github.com/jinzhu/gorm"

)

func SetupModels() *gorm.DB {
  db, err := gorm.Open("mysql", "root:root@/go_learn?charset=utf8&parseTime=True&loc=Local")
  if err != nil {
    panic("Failed to connect to database!")
  }

  db.AutoMigrate(&Book{})

  return db
}