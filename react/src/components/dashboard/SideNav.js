import React, { Component } from 'react';

export class SideNav extends Component {
    render() {
        return (
            <div className="side-wrap">
                <div className="side-item header">
                    Bakoda Bank
                </div>
                <div className="side-item account-wrap">
                    
                        <img className="account-image" height="50px" width="50px"  src={process.env.PUBLIC_URL + 'user.png'}></img>
        <h3>{this.props.user.firstname}</h3>
                </div>
            </div>
        );
    }
}

export default SideNav;
