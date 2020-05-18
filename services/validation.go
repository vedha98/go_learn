package services

import (
	"regexp"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

//InitiateValidators registering custom validations
func InitiateValidators() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("gmail", gmail)
	}
}

var gmail validator.Func = func(fl validator.FieldLevel) bool {
	if email, ok := fl.Field().Interface().(string); ok {
		match, _ := regexp.MatchString("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$", email)
		return match
	}
	return false
}
