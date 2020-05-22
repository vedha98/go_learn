package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/vedha98/go_learn/models"
)

func GetTransactions(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	pageInt, _ := strconv.Atoi(c.Param("page"))
	page := pageInt * 10
	userID := c.MustGet("userId").(interface{})
	var user models.User

	err := db.Where("id = ?", userID).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	accounts := []models.Account{}
	db.Model(&user).Related(&accounts)
	accountnumbers := getAccountNumbers(accounts)
	tsent := []models.Transaction{}
	trecieved := []models.Transaction{}
	db.Where("from_no IN (?)", accountnumbers).Offset(page * 10).Limit(10).Find(&tsent)
	db.Where("to_no IN (?)", accountnumbers).Offset(page * 10).Limit(10).Find(&trecieved)
	// transactions := struct {
	// 	sent     []models.Transaction
	// 	recieved []models.Transaction
	// }{
	// 	sent:     tsent,
	// 	recieved: trecieved}
	c.JSON(http.StatusOK, gin.H{"success": true, "sent": tsent, "recieved": trecieved})

}

func getAccountNumbers(m []models.Account) []string {
	var accountnumbers []string
	for _, value := range m {
		accountnumbers = append(accountnumbers, value.AccountNo)
	}

	return accountnumbers
}
