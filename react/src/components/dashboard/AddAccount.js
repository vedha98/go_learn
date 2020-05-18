import React, { Component } from 'react';
import TopNav from './TopNav';
import {connect} from 'react-redux';
import {getAccounts,addAccount} from '../../actions/accountActions';
export class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: "",
            accountNo: "",
            isPrimary: true
        }
    }

    handleChange = (input) => e => {
        this.setState({ [input]: e.target.value })
    }
    handleClick = (e) => {
        this.props.addAccount(this.state.accountNo,this.state.isPrimary)
        this.props.hideAdd()
    }
    handleCheck=(e)=>{
        this.setState({
            isPrimary: !this.state.isPrimary,
          });
    }
    render() {
        return (
            <div className="addAccount-wrap">
                <TopNav></TopNav>
                <div className="close-wrap"><button onClick={this.props.hideAdd}>close</button></div>
                <div className="form">
                    {this.state.validation !== "" ? <div className="alert">{this.state.validation}</div> : null}
                    <div className="form-input">
                        <div className="input-group">
                            <input type="text" value={this.state.accountNo} placeholder="account number" onChange={this.handleChange('accountNo')}></input>
                        </div>
                    </div>
                    <div className="form-input">
                        <div className="input-group select" >
                            Primary Account?
                        <label className="container-checkbox">
                                <input defaultChecked={this.state.isPrimary} onChange={this.handleChange('isPrimary')} type="checkbox"></input>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="input-group select" >
                            Account Type
                        <select className="primary-select" value={this.state.isPrimary} onChange={this.handleChange('isPrimary')}>
                                <option value={true} >PERSONAL</option>
                                <option value={false} >False</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-action">
                        <button className="step-button" onClick={this.handleClick}>Create Account</button>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    console.log(state)
    return{
        accounts:state.accountsReducer.accounts
      }
}
   
  
export default connect(mapStateToProps,{getAccounts,addAccount})((AddAccount))
