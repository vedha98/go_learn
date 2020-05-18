const { checkToken } = require("../services/checkToken");

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController')
const config = require('../config/jwttoken')
const jwt = require('jsonwebtoken');

router.post('/createadmin',(req,res)=>{
    adminController.createAdmin(req.body)
})

module.exports = router