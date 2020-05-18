import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

export class Welcome extends React.Component {

    getexcel=()=>{
        
        axios({
            url: 'http://localhost:8000/api/transfer/getexcel',
            method: 'GET',
            responseType: 'blob',
            headers:  {'Authorization': "bearer " + localStorage.getItem("token")}// important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Transactions.xlsx');
            document.body.appendChild(link);
            link.click();
          });
    }

    printpdf=()=>{
        var doc = new jsPDF();
        var col = ["s/n ","to No","Sent Amount"];
        var col1 = ["s/n","from No", "Recieved Amount"];
        var rows = [];
        var rows1 = [];
 

 
 
 let sent = this.props.sent
 let recieved = this.props.recieved
 
 
    sent.forEach((element,i) => {      
         var temp = [i,element.tono,element.amount];
         rows.push(temp);
 
     });    
     recieved.forEach((element,i) => {      
        var temp = [i,element.tono,element.amount];
        rows1.push(temp);

    });   
    let  finalY = doc.previousAutoTable.finalY;
         doc.text("Transactions of "+this.props.name, 14, 10);    
         doc.autoTable(col, rows, { startY: 30 });
       
         
         doc.autoTable(col1, rows1);
         doc.save('Test.pdf');
    }
              
             
            
          
    
    render() {
        return (
            <div className="welcome-wrap">
            Welcome back {this.props.name} ,<div><button className="add-btn" onClick={this.getexcel}>export excel</button><button className="add-btn" onClick={this.printpdf}>export pdf</button><button className="add-btn" onClick={this.props.showAdd}>add account</button></div>
        </div>
        );
    }
    componentDidMount=()=>{
    }
}

export default Welcome;
