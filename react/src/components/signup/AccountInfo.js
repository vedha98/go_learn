import React, { Component } from 'react';

export class accountinfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            validation:""
        }
    }
    
    handleClick=(e)=>{
        console.log(this.props.email)
        if(!/^[A-Za-z\s]+$/.test(this.props.firstname)){
            this.setState({validation:"invalid firstname"})
        }
        else if(!/^[A-Za-z\s]+$/.test(this.props.lastname)){
            this.setState({validation:"invalid lastname"})
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.props.email)){
            this.setState({validation:"invalid email"})
        }
        else{
            this.props.nextStep()
        }
    }
    render() {
        return (
            <div className="form">
                {this.state.validation!==""?<div className="alert">{this.state.validation}</div>:null}
                
                <div className="form-input">
                    <div className="input-group">
                        <input value={this.props.firstname} placeholder="firstname" onChange={this.props.handleChange('firstname')}></input>
                    </div>
                    <div className="input-group" >
                        <input value={this.props.lastname} placeholder="lastname" onChange={this.props.handleChange('lastname')}></input>
                    </div>
                </div>
                <div className="form-input">
                <div className="input-group">
                        <input value={this.props.email} placeholder="email" onChange={this.props.handleChange('email')}></input>
                    </div>
                </div>
                <div className="form-input">
                    <div className="input-group">
                    <input type="file" placeholder="user image" onChange={this.props.handleImageChange}></input>
                    </div>
                </div>
                <div className="form-action">
                    <button className="step-button" onClick={this.handleClick}>Next Step</button>
                </div>
            </div>
        );
    }
}

export default accountinfo;
