import React, { Component } from 'react';
import AccountCard from './AccountCard';
import Axios from 'axios';

export class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state={
            accounts:[]
        }
    }
    
    render() {
        return (
            <div className="accounts-wrap">
                {this.props.accounts.map((account)=><AccountCard key={account.id} accountdata={account}/>)}
                
            </div>
        );
    }
    componentDidMount=()=>{
    }
}


export default Accounts;
