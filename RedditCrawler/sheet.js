const GoogleSpreadsheet = require('google-spreadsheet');

module.exports = class Sheet {
    constructor(){
        // Add a google sheet id
        this.doc = new GoogleSpreadsheet('');
    }

    async load(){
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }

    async addSheet(title, headerValues){
        await doc.addSheet({
            title, headerValues
        });
        return this.doc.sheetsByIndex.length - 1;
    }

    async addRows(rows, i){
        const sheet = this.doc.sheetsByIndex[i];
        await sheet.addRows(rows)
    }

}
