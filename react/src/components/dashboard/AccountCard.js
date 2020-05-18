
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

export class AccountCard extends Component {
    showtransactions=()=>{
        console.log("transactionss")
        this.props.history.push('/dashboard/account/'+this.props.accountdata.AccountNo)
    }
    render() {
        return (
            <div className="account-card" onClick={this.showtransactions}>
            <div className="account-header">
    <div className="account-no">{this.props.accountdata.AccountNo}</div>
    {this.props.accountdata.IsPrimary?<div className="primary">primary</div>:null}
            </div>
            <div className="account-item">
                <div className="account-balance">
                    ${this.props.accountdata.balance}
                </div>
                 </div>
                 <div className="account-item">
                <div className="account-type">
                    {this.props.accountdata.AccountType}
                </div>
                 </div>
        </div>
        );
    }
}

export default withRouter(AccountCard);
