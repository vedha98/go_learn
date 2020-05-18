import { GET_TRANSACTIONS, SEND_MONEY, ADD_MONEY, FILTER_TRANSACTIONS,GET_PASSBOOK } from '../actions/types';
import {toast} from 'react-toastify'
import axios from 'axios';

toast.configure({position: toast.POSITION.BOTTOM_RIGHT})
export const gettransactions = (pageno=0)=> dispatch =>{
  console.log('get called');
  let url = 'http://localhost:8000/api/transfer/gettransactions/?page='+pageno
       let config = {
        headers: {'Authorization': "bearer " + localStorage.getItem("token")}
    };
        axios.get(url,config).then(res=>
  dispatch({
    type:GET_TRANSACTIONS,payload:res.data,pageno
  })
)
}
export const sendmoney = (fromno,tono,amount)=> dispatch =>{
    console.log('send money called');
    let url = 'http://localhost:8000/api/transfer/sendmoney'
         let config = {
          headers: {'Authorization': "bearer " + localStorage.getItem("token")}
      };
          axios.post(url,{fromno,tono,amount},config).then(res=>{
            if(res.data.success){
                toast.success(res.data.msg,{position: toast.POSITION.BOTTOM_RIGHT});
                dispatch({
                    type:SEND_MONEY,payload:res.data.transaction
                  })
            }else{
                toast.error(res.data.msg,{position: toast.POSITION.BOTTOM_RIGHT});
            }
   
}
  )
  }
  export const addmoney = (accno,amount)=> dispatch =>{
    console.log('get called');
    let url = 'http://localhost:8000/api/transfer/addmoney'
         let config = {
          headers: {'Authorization': "bearer " + localStorage.getItem("token")}
      };
          axios.post(url,{accno,amount},config).then(res=>{
            if(res.data.success){
                toast.success(res.data.msg,{position: toast.POSITION.BOTTOM_RIGHT});
                dispatch({
                    type:ADD_MONEY,payload:{accno,amount}
                  })
            }else{
                toast.error(res.data.msg,{position: toast.POSITION.BOTTOM_RIGHT});
            }
        }
    
  )
  }
  export const filtertransactions=(filter)=>dispatch=>{
      dispatch({type:FILTER_TRANSACTIONS,payload:filter})
  }
  export const getPassbook=(accno)=>dispatch=>{
    dispatch({type:GET_PASSBOOK,payload:accno})
}