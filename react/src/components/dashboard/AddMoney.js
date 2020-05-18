import React, { Component } from 'react';

export class AddMoney extends Component {
    constructor(props) {
        super(props);
        this.state={
            Amount:0
        }
        
    }
    handleChange=(input,e)=>{
        this.setState({[input]:e.target.value})
    }
    handleClick=(e)=>{
        this.props.addmoney(this.props.accno,this.state.Amount)
    }
    
    render() {
        return (
            <div>
                
                <div className="form">
                    <div className="form-input">
                        <div className="input-group">
                            <input type="text" value={this.state.Amount} placeholder="amount" onChange={e=>this.handleChange('Amount',e)}></input>
                        </div>
                    </div>
                    <div className="form-action">
                        <button className="step-button" onClick={this.handleClick}>Add Money</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddMoney;
