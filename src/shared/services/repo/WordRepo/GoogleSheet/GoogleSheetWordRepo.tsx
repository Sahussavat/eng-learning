import { Constant } from "../../../../constant";
import { WordsModel } from "../../../../models/WordModel/WordsModel";
import { GoogleSheetJSON } from "../../../api/googlesheetjson";
import { TOTAL_WORDS_BEFORE_LOADING, type Wordrepository } from "../WordRepository";

export class GoogleSheetWordRepo implements Wordrepository {

    private google_sheet_service : GoogleSheetJSON;

    constructor(google_sheet_service : GoogleSheetJSON = new GoogleSheetJSON(Constant.SHEET_ID)){
        this.google_sheet_service = google_sheet_service;
    }

    public async get_all_words_count(): Promise<number> {
        
        var data : Array<string> = await this.google_sheet_service.get_data(Constant.COUNT_COL_N_ROW, Constant.COUNT_COL_N_ROW);
        if (data.length) {
            return Number(data[0]);
        }
        return 0;
    }

    public async get_words_from(start_i: number, words_total: number): Promise<WordsModel> {
        var actual_start_i : number = start_i  + Constant.WORD_START_ROW;
        var end_i : number = actual_start_i + words_total;
        var data : Array<string> = await this.google_sheet_service.get_data(
            Constant.WORD_COL + actual_start_i, Constant.WORD_COL + end_i
        );
        if (data.length) {
            var ret : string[] = [];
            data.forEach((w : string) => {
                if (w) {
                    ret.push(w);
                }
            });
            return new WordsModel(ret);
        }
        return new WordsModel();
    }

    public async get_words_between_index(i : number) : Promise<WordsModel> {
        var total : number = TOTAL_WORDS_BEFORE_LOADING;
        var start_between_i : number = (Math.floor( i / total) * total);
        return (await this.get_words_from(start_between_i, total));
    }
    
}