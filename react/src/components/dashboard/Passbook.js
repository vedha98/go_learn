import React, { Component } from 'react';
import jsPDF from 'jspdf'
export class Passbook extends Component {
    printpdf = () => {
        var doc = new jsPDF();
        var col = ["s/n ", "fromno", "to No", "Amount", "Date"];
        var rows = [];
        this.props.passbook.forEach((element, i) => {
            var temp = [i, element.fromno, element.tono, element.amount, new Date(element.createdAt).toDateString()];
            rows.push(temp);

        });

        doc.text("Passbook of " + this.props.accno, 14, 10);
        doc.autoTable(col, rows, { startY: 30 });
        doc.save('passbook.pdf');
    }


    render() {
        return (
            <div className="passbook-wrap">
                <div className="btn-wrap">
                    <button className="add-btn" onClick={this.printpdf}>Print PDF</button>
                </div>

                <div className="passbook-item head">
                    <div className="rec-no">
                        fromno
                       </div>
                    <div className="rec-no">
                        tono
                       </div>
                    <div className="rec-no">
                        amount
                       </div>
                    <div className="rec-no">
                        date
                       </div>
                </div>
                {this.props.passbook.map((val, i) =>
                    <div className="passbook-item">
                        <div className="rec-no">
                            {val.fromno}
                        </div>
                        <div className="rec-no">
                            {val.tono}
                        </div>
                        <div className="rec-no">
                            {val.amount}
                        </div>
                        <div className="rec-no">
                            {new Date(val.createdAt).toDateString()}
                        </div>
                    </div>
                )}
            </div>
        );
    }
    componentDidMount = () => {
        this.props.getPassbook(this.props.accno)
    }
}

export default Passbook;
