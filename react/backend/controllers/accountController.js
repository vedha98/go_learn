const accservice = require('../services/database/db_accounts')
const valservice = require('../helpers/validator')
module.exports={
    ValidateAndCreateAccount:async function(user,accountdata){
        let AccountNo=accountdata.accountNo;
        
        let userid=user.id;
        let isPrimary=false;
        if(!valservice.AccNo(AccountNo)){ return ({success:false,msg:"invalid account number"})}
        if(accountdata.isPrimary)isPrimary=true
        let isfirst = await accservice.checkFirst(userid)
        if(isfirst)isPrimary=true;
        let existence = await accservice.checkAccountExists(AccountNo);
        if(existence){
        let acc = await accservice.createNewAccount(userid,AccountNo,isPrimary)
        let accounts = await this.getAllAccounts(user); 
        return({msg:"account created successfully",success:true,accounts})
        }else{
            let accounts = await this.getAllAccounts(user); 
            return({msg:"account already exists",success:false,accounts})
        }


    },
    getAllAccounts:async function(user){
        return await accservice.getAccounts(user.id)
    }
}