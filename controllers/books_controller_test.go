package controllers

import (
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/vedha98/go_learn/models"
)

func TestFindBooks(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	context, _ := gin.CreateTestContext(httptest.NewRecorder())
	db := models.SetupModels()
	context.Set("db", db)
	context.Set("userId", 1)
	tests := []struct {
		name string
		args args
	}{
		{name: "Test 1",
			args: args{
				c: context}}}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			FindBooks(tt.args.c)
		})
	}
}
