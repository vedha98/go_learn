const verifydb = require("../../models").verifykeys;
const otpdb = require("../../models").otpkeys;
module.exports={
    checkKey:function(key,callback){
        verifydb.findOne({where:{key}}).then(val=>{
            if(!val){ callback(false)}else{
                callback(val)
            }
        })
    },
    checkOTP:function(key,callback){
        otpdb.findOne({where:{key}}).then(val=>{
            if(!val){ callback(false)}else{
                callback(val)
            }
        })

    }

}