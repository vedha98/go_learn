const transferdb = require('../../models').Transactions;
const accdb = require('../../models').accounts

module.exports={
    transfermoney:async function(fromno,tono,fromid,toid,amount){
        return await transferdb.create({fromno,tono,fromid,toid,amount})
    },
    getall:async function(userId,page){
        userId = String(userId)
        offset = parseInt(page)*10
        let sent = await transferdb.findAll({offset,limit:10,where:{fromid:userId}})
        let recieved = await transferdb.findAll({offset,limit:10,where:{toid:userId}})
        return ({sent,recieved})
    },
    addmoney:async function(accno,amount){
       let account =  await accdb.findOne({where:{AccountNo:accno}})
       balance = parseInt(account.balance)+parseInt(amount);
       return await accdb.update({balance},{where:{AccountNo:accno}})

    }
}