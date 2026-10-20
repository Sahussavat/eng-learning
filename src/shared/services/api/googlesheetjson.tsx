interface V {
    'v': string
}
interface C {
    'c': Array<V>
}
interface RowData {
    'rows': Array<C>
}
export interface TableData {
    'table': RowData
}

export class GoogleSheetJSON {
    
    private sheet_id : String;

    constructor(sheet_id : String){ 
        this.sheet_id = sheet_id
    }

    async get_data(start : string, end : string, gid : String = "0") : Promise<Array<string>>{
        try{
            let url = `https://docs.google.com/spreadsheets/d/${this.sheet_id}/gviz/tq?`
            url += `gid=${gid}`
            url += `&range=${start}:${end}`
            const  data = await fetch(url)
            if (data && data.ok){
                let data_str : string = await data.text();
                let rex = /google\.visualization\.Query\.setResponse\(({.*})\);/;
                const payload = data_str.match(rex);
                if (payload && payload.length > 0){
                    let json_data : TableData = JSON.parse(payload[1]);
                    let ret : Array<string> = [];
                    let rows = json_data['table']['rows'];
                    for(let i=0;i<rows.length;i++){
                        var col_data : string = rows[i]['c'][0]['v'];
                        ret.push(col_data);
                    }
                    return ret
                }
            }
        } catch(e){
            console.log(e)
        }
        return []
    }
}