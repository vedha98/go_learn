const { checkToken } = require("../services/checkToken");
const accountController = require("../controllers/accountController")
const express = require('express');
const router = express.Router();
router.post('/createacc',checkToken,(req,res)=>{
    accountController.ValidateAndCreateAccount(req.user,req.body).then(({msg,success,accounts})=>{
        res.json({msg,success,accounts})
    })
})
router.get('/getaccounts',checkToken,(req,res)=>{
    accountController.getAllAccounts(req.user).then(val=>{
        res.json({accounts:val})
    })
})

module.exports = router