import React from 'react';
import { withRouter } from 'react-router-dom';
import './login.css';

const axios = require('axios');

class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Password: "",
            validation: "",
            login_result: ""
        };

    }
    goDashboard() {
        this.props.history.push('/dashboard');
    }
    handleLogin=()=> {
        this.setState({ validation: "" })

        if (this.state.id !== "" && this.state.Password !== "") {
            var self = this;
            //send post req
            axios.post('http://localhost:8000/api/users/login', {
                id: this.state.id,
                password: this.state.Password
            })
                .then(function (response) {

                    if (response.data.success) {
                        localStorage.setItem('token', response.data.token)
                        self.goDashboard()
                    } else {
                        self.setState({ validation: response.data.msg })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({ validation: "unable to connect to the server" })

                });

        } else {
            let val = ""
            if (this.state.Password === "") { val = "pls enter password" }
            if (this.state.id === "") { val = "pls enter id" }
            this.setState({ validation: val })
            console.log(this.state)
        }
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render() {

        return (<div className="login-container">
            <div className="form">
                {this.state.validation !== "" ? <div className="alert">{this.state.validation}</div> : null}

                <div className="form-input">
                    <div className="input-group">
                        <input value={this.state.id} placeholder="user ID" onChange={this.handleChange('id')}></input>
                    </div>
                    <div className="input-group" >
                        <input type="password" value={this.state.Password} placeholder="password" onChange={this.handleChange('Password')}></input>
                    </div>
                </div>
               
                <div className="form-action">
                    <button className="step-button" onClick={this.handleLogin}>Submit</button>
                </div>
            </div></div>
        );
    }
    componentDidMount() {
        localStorage.clear()
    }
}

export default withRouter(login);