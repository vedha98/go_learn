import React, { Component } from 'react';

export class SideNav extends Component {
    render() {
        return (
            <div className="side-wrap">
                <div className="side-item header">
                    Online Banking
                </div>
                <div className="side-item ">
                    Overview
                </div>
                <div className="side-item account-wrap">
                    
                        <img className="account-image" height="50px" width="50px"  src={this.props.user.image}></img>
        <h3>{this.props.user.firstname}</h3>
                </div>
            </div>
        );
    }
}

export default SideNav;
