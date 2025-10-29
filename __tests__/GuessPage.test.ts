import { describe, it, beforeAll, expect, afterEach } from 'vitest';
import { GuessSystem } from '../src/components/choice_page/GuessSystem'
import type { Data, TableData } from '../src/util/googlesheetjson';


const data_table = [
        ["Bird1"],
        ["Bird12"],
        ["Bird13"],
        ["Bird14"],
        ["Bird15"],
        ["Bird16"],
    ]

const first_row = [
    ['Words']
]

export function create_first_row_json(){
    return create_mock_data_json(first_row)
}

export function create_mock_data_json(d_table = data_table){
    let ret : TableData = {
        "table" : {
            "rows": [

            ]
        }
    }

    let data_table_with_str = d_table

    for(let i=0;i<data_table_with_str.length;i++){
        let c = []
        for(let j=0;j<data_table_with_str[i].length;j++){
            c.push({"v": data_table_with_str[i][j]})
        }
        ret['table']['rows'].push({ "c" : c })
    }

    return ret
}

export function create_result(){
    let ret : Data[] = []
    for(let i=0;i<data_table.length;i++){
        let row : Data = {}
        for(let j=0;j<data_table[i].length;j++){
            row[first_row[0][j]] = data_table[i][j]
        }
        ret.push(row)
        
    }
    return ret
}

export function to_google_format_res(str : string){
    return `google.visualization.Query.setResponse(${str});`
}

let switch_res = 0

function custom_fetch(){
    switch (switch_res){
        case 0:
            switch_res = 1
            return Promise.resolve(
                    new Response(to_google_format_res(JSON.stringify(create_first_row_json())), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    })
                )
        default:
            switch_res = 0
            return Promise.resolve(
                    new Response(to_google_format_res(JSON.stringify(create_mock_data_json())), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    })
                )
    }
}

describe("GuessSystem", ()=>{
    beforeAll(()=>{
        globalThis.fetch = custom_fetch
    })
    afterEach(()=>{
        switch_res = 0
    })
    describe("get_start_and_end_i", ()=>{
        it("Return start and end for loading data must be in specific section.", ()=>{
            let guessSys = new GuessSystem
            guessSys['n_in_segment'] = 10
            let start_n_end_arr = [
                [1,10],
                [11,20],
                [21,30],
                [21,30],
                [31,40],
            ]
            let test_i = [
                1, 14, 20, 29, 50
            ]
            for(let i=0;i<test_i.length;i++){
                let test_data = guessSys.get_start_and_end_i(test_i[i], 40)
                let expected_data = start_n_end_arr[i]
                expect(test_data[0]).toBe(expected_data[0])
                expect(test_data[1]).toBe(expected_data[1])
            }
        })
    })
})