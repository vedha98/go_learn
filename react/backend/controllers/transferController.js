const transervice = require('../services/database/db_transactions')
const accservice = require('../services/database/db_accounts')
const excelservice  = require('../services/excelfile')

module.exports={
    transfermoney:async function(data){
        let fromexist = await accservice.checkAccountExists(data.fromno)
        let toexist = await accservice.checkAccountExists(data.tono)
        if(fromexist || toexist) return ({msg:"account does not exist",success:false});

        let fromid =  await accservice.getUser(data.fromno);
        let toid = await accservice.getUser(data.tono);
        
        return await transervice.transfermoney(data.fromno,data.tono,fromid,toid,data.amount).then(transaction=>{
            return {msg:"money transferred successfully",success:true,transaction}
        })
    },
    getAllTransactions:async function(user,reqpage){
        let page = 0;
        if(reqpage)page=reqpage
       return await transervice.getall(user.id,page)

    },
    getexcelsheet:async function(user,response){
          let info = await transervice.getall(user.id)
           await excelservice.createExcel(info,response)
           
    },
    addmoney:async function(user,accno,amount){
        let existance = await accservice.userHasAccount(accno,user.id)
        if(!existance)return({success:false,msg:"account does not belong to the user"})
        await transervice.addmoney(accno,amount)
        return({success:true,msg:"money added successfully"})
    }
}