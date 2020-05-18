import React, { Component } from 'react';

export class Nominee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: ""
        }
    }

    handleClick = (e) => {
        console.log(this.props.email)
        if(!/^[A-Za-z\s]+$/.test(this.props.nfirstname)){
            this.setState({validation:"invalid nominee firstname"})
        }
        else if(!/^[A-Za-z\s]+$/.test(this.props.nlastname)){
            this.setState({validation:"invalid nominee lastname"})
        }
        else if (!/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(this.props.ndob)) {
            this.setState({ validation: "invalid nominee dob" })
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
                        <input  value={this.props.nfirstname} placeholder="nominee firstname" onChange={this.props.handleChange('nfirstname')}></input>
                    </div>
                    <div className="input-group" >
                        <input value={this.props.nlastname} placeholder="nominee lastname" onChange={this.props.handleChange('nlastname')}></input>
                    </div>
                </div>
                <div className="form-input">
                    <div className="input-group">
                        <input type="date" value={this.props.ndob} placeholder="ndob" onChange={this.props.handleChange('ndob')}></input>
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

export default Nominee;
