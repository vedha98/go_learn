import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
export class TransactionNav extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    render() {
        return (
            <div className="transnav-wrap">
                <div style={{display:"flex"}}>
               <div onClick={e=>this.props.setstep(0)} className={this.props.stage===0?"transnav-item active":"transnav-item"}>
                Send Money
               </div>
               <div onClick={e=>this.props.setstep(1)} className={this.props.stage===1?"transnav-item active":"transnav-item"}>
                Add Money
               </div>
               <div onClick={e=>this.props.setstep(2)} className={this.props.stage===2?"transnav-item active":"transnav-item"}>
                Passbook
               </div>
               </div>
               <div onClick={this.props.closewindow} className="transnav-item close">
               <FontAwesomeIcon icon={faTimes} />
               </div>
            </div>
        );
    }
}

export default TransactionNav;
