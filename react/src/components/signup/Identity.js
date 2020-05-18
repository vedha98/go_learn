import React, { Component } from 'react';

export class Identity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: ""
        }
    }

    handleClick = (e) => {
        console.log(this.props.email)
        if (!/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(this.props.panNo)) {
            this.setState({ validation: "invalid PAN number" })
        }
        else if (!/^\d{10}$/.test(this.props.phone)) {
            this.setState({ validation: "invalid phone number" })
        }
        else if (!/^\d{12}$/.test(this.props.aadharNo) && !/^\d{16}$/.test(this.props.aadharNo)) {
            this.setState({ validation: "invalid aadhar number" })
        }
        else {
            this.props.nextStep()
        }
    }
    render() {
        return (
            <div className="form">
                {this.state.validation !== "" ? <div className="alert">{this.state.validation}</div> : null}
                <div className="form-input">
                    <div className="input-group">
                        <input type="text" value={this.props.panNo} placeholder="pan number" onChange={this.props.handleChange('panNo')}></input>
                    </div>
                    <div className="input-group" >
                        <input type="number" value={this.props.phone} placeholder="phone password" onChange={this.props.handleChange('phone')}></input>
                    </div>
                </div>
                <div className="form-input">
                    <div className="input-group">
                        <input type="number" value={this.props.aadharNo} placeholder="aadhar number" onChange={this.props.handleChange('aadharNo')}></input>
                    </div>
                </div>
                <div className="form-action">
                    <button className="step-button" onClick={this.props.prevStep}>Prev Step</button>
                    <button className="step-button" onClick={this.handleClick}>Next Step</button>

                </div>
            </div>
        );
    }
}

export default Identity;