package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/vedha98/go_learn/models"
)

type CreateParams struct {
	IsPrimary bool   `json:"isPrimary"`
	AccountNo string `json:"AccountNo"`
}
type addMoneyParams struct {
	AccountNo string `json:"accno"`
	Amount    int    `json:"amount,string"`
}
type sendMoneyParams struct {
	FromNo string `binding:"required" json:"fromno"`
	ToNo   string `binding:"required" json:"tono" `
	Amount int    `binding:"required" json:"amount,string" `
}

func CreateAccount(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})
	var user models.User

	err := db.Where("id = ?", userId).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	var params CreateParams
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "msg": "invalid details"})
		return
	}
	db.Model(&user).Association("Accounts").Append(models.Account{AccountNo: params.AccountNo, IsPrimary: params.IsPrimary})
	accounts := []models.Account{}
	db.Model(&user).Related(&accounts)
	c.JSON(http.StatusOK, gin.H{"success": true, "accounts": accounts})
}

func GetAccounts(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})
	var user models.User

	err := db.Where("id = ?", userId).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	accounts := []models.Account{}
	db.Model(&user).Related(&accounts)
	c.JSON(http.StatusOK, gin.H{"success": true, "accounts": accounts})
}

func AddMoney(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})
	var user models.User

	err := db.Where("id = ?", userId).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	var params addMoneyParams
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	account := models.Account{}
	accerr := db.Where("account_no = ? and user_id=(?)", params.AccountNo, userId).First(&account).Error
	if accerr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!", "msg": "Account Not Found"})
		return
	}
	account.Balance += params.Amount
	db.Save(&account)
	c.JSON(http.StatusOK, gin.H{"success": true, "msg": "Money Added Successfully"})
}

func SendMoney(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userId := c.MustGet("userId").(interface{})
	var user models.User

	err := db.Where("id = ?", userId).First(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
		return
	}
	var params sendMoneyParams
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "msg": "invalid details"})
		return
	}
	fromAccount := models.Account{}
	toAccount := models.Account{}
	faccerr := db.Where("account_no = ? and user_id = ?", params.FromNo, userId).First(&fromAccount).Error
	taccerr := db.Where("account_no = ?", params.ToNo).First(&toAccount).Error
	if faccerr != nil || taccerr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found!", "msg": "Account Not Found"})
		return
	}
	if fromAccount.Balance >= params.Amount {
		fromAccount.Balance -= params.Amount
		toAccount.Balance += params.Amount
		db.Save(&fromAccount)
		db.Save(&toAccount)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"msg": "Not Enough Balance"})
		return
	}
	accounts := []models.Account{}
	db.Model(&user).Related(&accounts)
	c.JSON(http.StatusOK, gin.H{"success": true, "accounts": accounts, "msg": "Money Sent Successfully"})
}
