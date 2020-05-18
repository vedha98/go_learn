const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/jwttoken');
module.exports={
    verifytoken:function(token){
       return jwt.verify(token,jwtconfig.secret , function(err, decoded) {
           console.log(decoded)
            return decoded
          });
    }
    
}