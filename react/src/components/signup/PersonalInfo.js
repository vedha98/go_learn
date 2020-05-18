import React, { Component } from 'react';

export class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: ""
        }
    }

    handleClick = (e) => {
        console.log(this.props.email)
        if (!/^[A-Za-z]\w{7,14}$/.test(this.props.password)) {
            this.setState({ validation: "invalid password" })
        }
        else if (this.props.password !== this.props.cpassword) {
            this.setState({ validation: "passwords do not match" })
        }
        else if (!/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(this.props.dob)) {
            this.setState({ validation: "invalid dob" })
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
                        <input type="password" value={this.props.password} placeholder="password" onChange={this.props.handleChange('password')}></input>
                    </div>
                    <div className="input-group" >
                        <input type="password" value={this.props.cpassword} placeholder="confirm password" onChange={this.props.handleChange('cpassword')}></input>
                    </div>
                </div>
                <div className="form-input">
                    <div className="input-group">
                        <input type="date" value={this.props.dob} placeholder="dob" onChange={this.props.handleChange('dob')}></input>
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

export default PersonalInfo;
