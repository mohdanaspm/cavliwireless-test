import * as XLSX from 'xlsx';
import { Tarrif } from '../model/tarrif-sheet.model';

export const readXlsxSheet = (file: File) => {
    const reader: FileReader = new FileReader();
    let dataString;
    return new Promise((resolve,reject)=>{
    reader.onload = (e: any) => {

        const data = reader.result;
        const workBook = XLSX.read(data, { type: 'binary' });
        let jsonData = workBook.SheetNames.reduce((initial: any, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
        }, {});
        dataString = JSON.stringify(jsonData);
        if(dataString) resolve(dataString);
        
    };
    reader.readAsBinaryString(file);
});
    
}

