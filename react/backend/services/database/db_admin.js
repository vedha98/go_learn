const adminsdb = require('../../models').admins
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createuser: async function (user) {
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            bcrypt.hash(user.password, salt,  (err, hash)=>{
                let password = hash
                adminsdb.create({ username: user.username, password }).then(val=>{
                    console.log(val)
                    return true
                })
        
            })
        })
    }
}