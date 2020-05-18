const adminservice = require('../services/database/db_accounttype')
module.exports={
    createAdmin: async function(user){
        adminservice.createAdmin(user)
    }
}