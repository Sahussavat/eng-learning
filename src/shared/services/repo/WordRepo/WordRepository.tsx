import type { WordsModel } from "../../../models/WordModel/WordsModel";

export const TOTAL_WORDS_BEFORE_LOADING : number = 100;

export interface Wordrepository {
    get_all_words_count() : Promise<number>;
    get_words_from(start_i : number, words_total : number) : Promise<WordsModel>;
    get_words_between_index(i : number) : Promise<WordsModel>;
}