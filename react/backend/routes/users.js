const { checkToken } = require("../services/checkToken");

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const config = require('../config/jwttoken')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('image');
  
//get all users
router.get('/',(req,res)=>{
  
  
})
router.post('/register',upload,(req,res)=>{
   
    const userdata = req.body;
    userdata.image = "http://localhost:8000/uploads/"+req.file.filename
    console.log(userdata.image)
    userController.ValidateAndCreateUser(userdata,(val,msg)=>{
        if(val){
            res.json({"success":true,"msg":msg})
        }
        else{
            res.json({"success":false,"msg":msg})
            fs.unlink(req.file.path,(err) => {
                if (err) throw err;
                console.log(req.file.filename+' was deleted');
              })
        }
        
    })
})
router.post('/login',(req,res)=>{
    const userdata = req.body;
    if(userdata.id){
        if(userdata.password){
            userController.CheckPasswordAcc(userdata,(val,msg)=>{
                let token="" 
                if(val){token = jwt.sign({id:userdata.id}, config.secret, {
                    expiresIn: 604800 
                  })}
                res.json({token:token,success:val,msg:msg})
            })
        }else{
            res.json({success:false,msg:"no password"})
        }
    }else{
        res.json({success:false,msg:"no Customer ID"})
    }
})
router.get('/validate/:key',(req,res)=>{
    userController.ValidateEKey(req.params.key,val=>{
        if(val){
            userController.EVerifyUser(val.userId).then(val=>{res.json({success:"true",msg:"user verified successfully"})})
        }else{
            res.json({msg:"wrong key"})
        }
    })

})
router.get('/otpverify/:key',(req,res)=>{
    userController.ValidateOTP(req.params.key,val=>{
        if(val){
            userController.PVerifyUser(val.userId).then(val=>{res.json({success:"true",msg:"user verified successfully"})})
        }else{
            res.json({msg:"wrong otp"})
        }
    })

})
router.get('/tokenlogin',checkToken,(req,res)=>{
    res.json({user:req.user,success:true,msg:"logged in successfully"})
})


module.exports = router