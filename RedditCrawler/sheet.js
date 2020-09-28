const GoogleSpreadsheet = require('google-spreadsheet');

module.exports = class Sheet {
    constructor(){
        this.doc = new GoogleSpreadsheet('');
    }

    async load(){

    }

    async addSheet(title){
        await this.doc.addSheet({
            title
        });
        return this.doc.sheetsByIndex.length - 1;
    }

    async addRows(row, i){
        
    }
}
