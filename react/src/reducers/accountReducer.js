import {GET_ACCOUNTS,ADD_ACCOUNT,LOAD_ACCOUNTS, ADD_MONEY} from '../actions/types'

let initialState={
    accounts:[],
    selectedaccount:{}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ACCOUNTS:
            return {...state,accounts:action.payload};
        case GET_ACCOUNTS:
            return{...state}
        case ADD_ACCOUNT:
            return {...state,accounts:action.payload}
        case ADD_MONEY:
           let newaccounts= state.accounts
           newaccounts.forEach((account,i) => {
                if(account.AccountNo===action.payload.accno){
                    newaccounts[i].balance=parseInt(account.balance)+parseInt(action.payload.amount);
                }
            });
            return{...state,accounts:newaccounts}             
        default:
            return state;
    }
};