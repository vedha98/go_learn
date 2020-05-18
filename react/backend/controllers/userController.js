const uservalidation = require('../services/uservalidation');
const userverify = require('../services/verification')
const userregdb = require('../services/database/db_uregistration')
const verifydb = require('../services/database/db_verification')
const jwtservice = require('../services/jwtservice')
const verify = require('../services/verification')
module.exports = {
   ValidateAndCreateUser: async function (user,callback) {
    uservalidation.ValidateUser(user,(val,msg)=>{
      if(val){
        userregdb.checkExist(user).then(exist=>{
          if(exist){
            userregdb.createUser(user,val=>{
              if(val){
                
                callback(user,"usercreated")

              }else{
                callback(false,"user creation failed")  
              }
              
            })
          }else{
            callback(false,"user already exists")  
          }
          
        })
        
      }else{
        callback(false,msg)
      }
    })
   
      
  },
  CheckPasswordAcc(data,callback){
    userregdb.findUserbyCustId(data,(user,msg)=>{
      if(user){
        userregdb.CheckPassword(user,data.password,(res)=>{
          if(res){
            if(user.everified===true){
             
              if(user.pverified===true){
                callback(true,"user logged in")
              }else{
                verify.sendOTP(user)
                callback(false,"please enter your otp")
              }
            }else{   
              verify.sendVerifyMail(user)
              callback(false,"please verify your email")
            }
          }else{
            callback(false,"wrong password")
          }
        })
      }else{
        callback(false,msg)
      }
     

    })
  },
  ValidateEKey:function(key,callback){
   verifydb.checkKey(key,val=>{callback(val)})
  },
  ValidateOTP:function(key,callback){
    verifydb.checkOTP(key,val=>{callback(val)})
   },
  EVerifyUser:function(userid){
    return userregdb.Everify(userid).then(val=>{return true})
  },
  PVerifyUser:function(userid){
    return userregdb.Pverify(userid).then(val=>{return true})
  },
  checkToken:async function(token){
    var value = jwtservice.verifytoken(token)
    if(value){
      return value
    } else{
      return false
    }
  },
  getUserById:function(id,callback){
    var query={id}
    userregdb.findUserbyCustId(query,(user,msg)=>{
      callback(user,"found user")
    })
  }
};