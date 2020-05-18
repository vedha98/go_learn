const validator = require('../helpers/validator');
module.exports = {
    ValidateUser:  function (user,callback) {
     //user validation  
     if(validator.Username(user.firstname) && validator.Username(user.lastname) && validator.Email(user.email) && validator.AADHAR(user.aadharNo) && validator.Password(user.password) && validator.PAN(user.panNo) && validator.DATE(user.dob) && validator.Username(user.nfirstname) && validator.Username(user.nlastname) && validator.DATE(user.ndob) && validator.Phone(user.phone)){       
      callback(true)                      
     }else{
    callback(false,"invalid details")
     }
}
  
  
}
 