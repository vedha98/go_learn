const { checkToken } = require("../services/checkToken");

const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.post('/sendmoney',(req,res)=>{
transferController.transfermoney(req.body).then(({success,msg,transaction})=>{
    res.json({success,msg,transaction})
})
})
router.post('/addmoney',checkToken,(req,res)=>{
    transferController.addmoney(req.user,req.body.accno,req.body.amount).then(({msg,success})=>{
        res.json({msg,success})
    })
})
router.get('/gettransactions',checkToken,(req,res)=>{
    transferController.getAllTransactions(req.user,req.query.page).then(val=>{
        res.json({val})
    })
})
router.get('/getexcel',checkToken,(req,res)=>{
    transferController.getexcelsheet(req.user,res);
})
module.exports = router;