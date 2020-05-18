import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import transactionReducer from './transactionReducer';


export default combineReducers({

  accountsReducer:accountReducer,transactionReducer:transactionReducer


  
})