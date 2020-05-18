import {GET_ACCOUNTS,ADD_ACCOUNT, LOAD_ACCOUNTS} from '../actions/types';
import {toast} from 'react-toastify'
import axios from 'axios';

toast.configure({position: toast.POSITION.BOTTOM_RIGHT})
export const loadAccounts = ()=> dispatch =>{
  console.log('get called');
  let url = 'http://localhost:8000/api/accounts/getaccounts'
       let config = {
        headers: {'Authorization': "bearer " + localStorage.getItem("token")}
    };
        axios.get(url,config).then(res=>
  dispatch({
    type:LOAD_ACCOUNTS,payload:res.data.accounts
  })
)
}
export const getAccounts = ()=> dispatch =>{
   
    dispatch({
      type:GET_ACCOUNTS,payload:null
    })
  
  }
export const addAccount = (accountNo,isPrimary)=> dispatch =>{
    console.log('get called');
    let config = {
        headers: {'Authorization': "bearer " + localStorage.getItem("token")}
    };
    axios.post('http://localhost:8000/api/accounts/createacc', {
            accountNo,
            isPrimary
        },config).then(res=>{
            if(res.data.success){
                toast.success("account added successfully",{position: toast.POSITION.BOTTOM_RIGHT});
                dispatch({
                    type:ADD_ACCOUNT,
                    payload:res.data.accounts   
                })
               
            }else{
               toast.error(res.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
            
        }
            
        )
  }