import { GET_TRANSACTIONS, SEND_MONEY, FILTER_TRANSACTIONS, GET_PASSBOOK } from '../actions/types'

let initialState={
    sent:[],
    recieved:[],
    fsent:[],
    frecieved:[],
    passbook:[],
    currentpage:0,
    redirect:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS:
            console.log(action)
            return{...state,
                sent:[...state.sent,...action.payload.val.sent],
                recieved:[...state.recieved,...action.payload.val.recieved],
                fsent:[...state.sent,...action.payload.val.sent],
                frecieved:[...state.recieved,...action.payload.val.recieved],
                currentpage:action.pageno
            }
        case SEND_MONEY:
            console.log(action)
            if(action.payload.toid==action.payload.fromid){
                return{
                    ...state,redirect:true,sent:[...state.sent,action.payload],recieved:[...state.recieved,action.payload],fsent:[...state.sent,action.payload],frecieved:[...state.recieved,action.payload]
                } 
            }else{
                return{
                    ...state,redirect:true,sent:[...state.sent,action.payload],fsent:[...state.sent,action.payload],frecieved:[...state.recieved]
                } 
            }
        case FILTER_TRANSACTIONS:
            let fsent = state.sent;
            let frecieved = state.recieved;
            if(action.payload!=""){
                fsent = fsent.filter((val)=>{
                    // return val.id===parseInt(action.payload)})
                    return String(val.id).indexOf(String(action.payload))>-1 || String(val.tono).indexOf(String(action.payload))>-1 || String(val.amount).indexOf(String(action.payload))>-1 })
                frecieved = frecieved.filter((val)=>{
                    return String(val.id).indexOf(String(action.payload))>-1 || String(val.fromno).indexOf(String(action.payload))>-1 || String(val.amount).indexOf(String(action.payload))>-1 })
                       
            } 
            return{...state,fsent,frecieved}    
        case GET_PASSBOOK:
            let combined =[...state.recieved,...state.sent]
            combined = combined.filter(val=>{
                return(String(action.payload)===val.fromno||String(action.payload)===val.tono)
            })
            combined.sort(function(a, b) {
                a = new Date(a.createdAt);
                b = new Date(b.createdAt);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            return{...state,passbook:combined}                 
        default:
            return state;
    }
};