
import { WordsModel } from "../../../../models/WordModel/WordsModel";
import type { Wordrepository } from "../WordRepository";

export class MockWordRepository implements Wordrepository {
    
    private words : string[] = [
        "Bob",
        "Jack",
        "Alan"
    ];
    
    public async get_all_words_count() : Promise<number> {
        return this.words.length;
    }
    
    public async get_words_from(start_i : number, words_total : number) : Promise<WordsModel> {
        if (this.words.length <= 0 || start_i < 0) {
            return new WordsModel();
        }
        var sliced_data : String[] = this.words.slice(start_i, start_i + words_total);
        var ret : string[] = [];
        sliced_data.forEach((w : String) => {
            ret.push(w.toString());
        });
        return new WordsModel(ret);
    }
    
    public get_words() : String[] {
        return this.words;
    }

    public async get_words_between_index(_i: number): Promise<WordsModel> {
        return new WordsModel(this.words);
    }
}