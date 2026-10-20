import { TOTAL_WORDS_BEFORE_LOADING } from "../../../shared/services/repo/WordRepo/WordRepository";

export class GuessSystem {

    public static cal_current_section(current_word_i : number) : number {
        return (Math.floor(current_word_i / TOTAL_WORDS_BEFORE_LOADING) + 1) * TOTAL_WORDS_BEFORE_LOADING;
    }

    public static is_i_still_under_bar(current_word_i : number, current_section_bar : number) : boolean {
        return current_section_bar > current_word_i;
    }
}