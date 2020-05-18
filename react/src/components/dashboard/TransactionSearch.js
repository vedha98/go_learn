import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filtertransactions} from '../../actions/transactionActions';
export class TransactionSearch extends Component {
    constructor(props) {
        super(props);
        this.state={
            val:""
        }
    }
    
    handleChange=(e)=>{
        this.setState({val:e.target.value});
        this.props.filtertransactions(e.target.value)
    }
    render() {
        return (
            <div className="search-wrap">
                <input className="search-input" val={this.state.val} onChange={this.handleChange} placeholder="Search transactions" className="transaction-search"></input>
            </div>
        );
    }
}


export default connect(null,{filtertransactions})(TransactionSearch)