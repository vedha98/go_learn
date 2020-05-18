const accountsdb = require('../../models').accounts;
module.exports = {
    checkAccountExists: async function (accountno) {
        const AccountNo = String(accountno)
        return accountsdb.findOne({ where: { AccountNo } }).then(account => {
            if (account) {
                return false
            } else {
                return true
            }
        });
    },
    checkFirst: async function (userid) {
        let userId = String(userid);
        return accountsdb.findOne({ where: { userId } }).then(account => {
            if (account) {
                return false
            } else {
                return true
            }
        });
    },
    removePrimary:async function(userId){
        accountsdb.findAll({ where: { userId } }).then((instances) => {
            instances.forEach(function (instance) {
                instance.update({ IsPrimary: false });
            });
        });
    },
    createNewAccount: async function (userid, accountno, isprimary) {
        let userId = String(userid);
        const AccountNo = String(accountno)
        if (isprimary) {
            await this.removePrimary(userId)
        }
        return await accountsdb.create({ userId, AccountNo, IsPrimary: isprimary, balance: 0, AccountType: "PERSONAL" })
    },
    getAccounts: async function (userid) {
        const userId = String(userid);
        return await accountsdb.findAll({where:{userId}})
    },
    getUser:async function (AccountNo){
        return await accountsdb.findOne({ where: { AccountNo } }).then(account => {
            return account.userId
        })
    },
    userHasAccount:async function(AccountNo,userId){
       AccountNo =  String(AccountNo)
       return await accountsdb.findOne({where:{AccountNo}}).then(account=>{
        if(account){
            if(account.userId==userId){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
       });
      
    }
    
}