import React, { Component } from 'react';

export class TransactionNav extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    render() {
        return (
            <div className="transnav-wrap">
               <div onClick={e=>this.props.setstep(0)} className={this.props.stage===0?"transnav-item active":"transnav-item"}>
                Send Money
               </div>
               <div onClick={e=>this.props.setstep(1)} className={this.props.stage===1?"transnav-item active":"transnav-item"}>
                Add Money
               </div>
               <div onClick={e=>this.props.setstep(2)} className={this.props.stage===2?"transnav-item active":"transnav-item"}>
                Passbook
               </div>
               <div onClick={this.props.closewindow} className="transnav-item close">
               {/* <svg className="cross">
               <path  d="M98.159,150.539L10.858,237.84c-14.461,14.469-14.461,37.936,0,52.397
		c14.453,14.453,37.92,14.453,52.372,0l87.309-87.317l87.293,87.317c14.469,14.453,37.92,14.453,52.381,0
		c14.477-14.469,14.461-37.936,0-52.397l-87.293-87.301l87.301-87.285c14.469-14.477,14.469-37.936,0-52.397
		c-14.469-14.477-37.92-14.477-52.389,0l-87.293,87.309L63.23,10.858c-14.453-14.477-37.92-14.477-52.381,0
		c-14.461,14.461-14.461,37.895,0,52.364L98.159,150.539z"/>
               </svg> */}
               close
               </div>
            </div>
        );
    }
}

export default TransactionNav;
