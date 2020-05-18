import React from 'react';
import { withRouter } from 'react-router-dom';
import AccountInfo from './AccountInfo'
import PersonalInfo from './PersonalInfo';
import Steps from './Steps'
import { toast } from 'react-toastify'
import "./signup.css"
import Identity from './Identity';
import Nominee from './Nominee';
import Review from './Review';
const axios = require('axios');
class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            aadharNo: "",
            password: "",
            cpassword: "",
            panNo: "",
            dob: "",
            nfirstname: "",
            nlastname: "",
            phone: "",
            ndob: "",
            valid_result: "",
            stage: 0,
            validation: {
                firstname: "",
                lastname: "",
                email: "",
                aadharNo: "",
                password: "",
                cpassword: "",
                panNo: "",
                nfirstname: "",
                nlastname: "",
                phone: "",
                ndob: "",
                image: null
            }

        };
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };
    handleImageChange = (e) => {

        e.preventDefault();
        this.setState({ imagename: e.target.value })
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    nextstep = () => {
        this.setState(state => ({ stage: state.stage + 1 }))
    }
    prevstep = () => {
        if (this.state.stage > 0) {
            this.setState(state => ({ stage: state.stage - 1 }))
        }
    }
    goLogin() {
        this.props.history.push('/login');
    }
    registerClick = () => {
        var self = this;
        console.log(this.state)
        let form = new FormData();
        form.append("image", this.state.image,this.state.image.name)
        form.append("firstname",this.state.firstname);
        form.append("lastname",this.state.lastname);
        form.append("password",this.state.password);
        form.append("email",this.state.email);
        form.append("phone",this.state.phone);
        form.append("aadharNo",this.state.aadharNo);
        form.append("panNo",this.state.panNo);
        form.append("dob",this.state.dob);
        form.append("nfirstname",this.state.nfirstname);
        form.append("nlastname",this.state.nlastname);
        form.append("ndob",this.state.ndob);
        axios.post('http://localhost:8000/api/users/register',form)
            .then(function (response) {
                console.log(response);
                if (response.data.success) {

                    self.goLogin()
                    toast.success(response.data.msg)
                } else {
                    toast.error(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error("unable to connect to the server")

            })
    }
    render() {
        return (
            <div className="signup-container">
                <Steps currentstep={this.state.stage} />
                {{
                    0: (
                        <AccountInfo {...this.state} nextStep={this.nextstep} handleChange={this.handleChange} handleImageChange={this.handleImageChange} />
                    ),
                    1: (
                        <PersonalInfo {...this.state} prevStep={this.prevstep} nextStep={this.nextstep} handleChange={this.handleChange} />
                    ),
                    2: (
                        <Identity {...this.state} prevStep={this.prevstep} nextStep={this.nextstep} handleChange={this.handleChange} />
                    ),
                    3: (
                        <Nominee {...this.state} prevStep={this.prevstep} nextStep={this.nextstep} handleChange={this.handleChange} />
                    ),
                    4: (
                        <Review {...this.state} prevStep={this.prevstep} nextStep={this.registerClick} />
                    ),

                    default: (
                        <AccountInfo />
                    )
                }[this.state.stage]}
            </div>
        );
    }
}

export default withRouter(signup);


