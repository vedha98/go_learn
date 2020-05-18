var Excel = require('exceljs');
var options = {
    filename: './streamed-workbook.xlsx',
    useStyles: true,
    useSharedStrings: true
};

module.exports = {
    createExcel: async function (info,response) {

        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 's/no', key: 'no', width: 10 },
            { header: 'fromAccno', key: 'fromaccno', width: 32 },
            { header: 'toAccno', key: 'toaccno', width: 32 },
            { header: 'amount', key: 'amount', width: 10 }
        ];
        console.log(info)
        await worksheet.addRow({ no:"sent" });
        await info.sent.forEach((trans,index) => {
            worksheet.addRow({ no:index, fromaccno:trans.fromno,toaccno:trans.tono,amount:trans.amount });
        });
        await worksheet.addRow({ no:"recieved" });
        await info.recieved.forEach((trans,index) => {
            worksheet.addRow({ no:index, fromaccno:trans.fromno,toaccno:trans.tono,amount:trans.amount });
        });
        var fileName = 'Transactions.xlsx';

        response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        await workbook.xlsx.write(response);

        response.end();

    }
}