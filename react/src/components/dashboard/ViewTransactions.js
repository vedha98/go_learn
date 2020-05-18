import React, { Component } from 'react';

export class ViewTransactions extends Component {
    constructor(props) {
        super(props);
        this.state={
            reqpage:0
        }
    }
    
    render() {
        return (<div >
            <div className="view-head">
                <div id="rec-head" className="rec-item-head">transactions from</div>
                <div id="sent-head" className="rec-item-head">transactions to</div>
            </div>
            <div id="view-wrap" ref={this.paneDidMount} className="view-wrap">
                <div id="viewtrans">
                <div  className="rec-wrap">

                    {this.props.recieved.map((val, i) =>
                        <div key={i} className="rec-item">
                            <div className="rec-no">
                                {val.id}
                            </div>
                            <div className="rec-no">
                                {val.fromno}
                            </div>
                            <div className="rec-amount">
                                +{val.amount}
                            </div>
                        </div>
                    )}
                </div>
                <div id="sentview" className="sent-wrap">

                    {this.props.sent.map((val, i) =>
                        <div key={i} className="rec-item">
                            <div className="rec-no">
                                {val.id}
                            </div>
                            <div className="rec-no">
                                {val.tono}
                            </div>
                            <div className="sent-amount">
                                -{val.amount}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
        );
    }
    isBottom(el,wrap) {
        console.log(el.getBoundingClientRect(),wrap.getBoundingClientRect())
        return el.getBoundingClientRect().bottom-wrap.getBoundingClientRect().bottom<= 20;
    }
    paneDidMount = (node) => {
        if (node) {
            node.addEventListener('scroll', this.trackScrolling);
        }
    };
    trackScrolling = () => {
        const wrappedElement = document.getElementById('viewtrans');
        const wrap = document.getElementById('view-wrap');
        console.log(this.state.reqpage)
        if (this.isBottom(wrappedElement,wrap)) {
            let reqpage = this.state.reqpage
            if(reqpage===this.props.currentpage){
               this.setState({reqpage:reqpage+1})
                this.props.gettransactions(reqpage+1)
            }
        }
    };
}

export default ViewTransactions;
