import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';
import {getAccounts,loadAccounts} from '../../actions/accountActions';
import {gettransactions,sendmoney} from '../../actions/transactionActions';

export class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state={
            clientNo :"",
            Amount:0,
            account:{
                balance:0

            }

        }
    }
    handleChange=(value,e)=>{
        this.setState({[value]:e.target.value})
        
    }
    handleClick=(e)=>{

        this.props.sendmoney(this.state.account.AccountNo,this.state.clientNo,this.state.Amount)
        this.setState({
            clientNo:"",
            Amount:0
        })
    }
    
    render() {
        return (
            <div>
             
                <div className="form">
                    <div className="form-input">
                        <div className="input-group">
                            <input type="text" value={this.state.clientNo} placeholder="account number" onChange={e=>this.handleChange('clientNo',e)}></input>
                        </div>
                    </div>
                    <div className="form-input">
                        <div className="input-group">
                            <input type="text" value={this.state.Amount} placeholder="amount" onChange={e=>this.handleChange('Amount',e)}></input>
                        </div>
                    </div>
                    <div className="form-action">
                        <button className="step-button" onClick={this.handleClick}>Send Money</button>

                    </div>
                </div>
            </div>
        );
    }
    componentDidMount=()=>{
        let account = this.props.accounts.find(item => {
            return item.AccountNo == this.props.match.params.id
         })
         if(account)this.setState({account})
         
        
    }
    
    componentWillReceiveProps=()=>{
        let account = this.props.accounts.find(item => {
            return item.AccountNo == this.props.match.params.id
         })
         if(account)this.setState({account})
            

        
    }
    
}

export default withRouter(Transaction)
