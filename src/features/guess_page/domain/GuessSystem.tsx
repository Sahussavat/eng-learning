import { TOTAL_WORDS_BEFORE_LOADING } from "../../../shared/services/repo/WordRepo/WordRepository";

export class GuessSystem {

    public static cal_current_section(current_word_i : number) : number {
        return (Math.floor(current_word_i / TOTAL_WORDS_BEFORE_LOADING) + 1) * TOTAL_WORDS_BEFORE_LOADING;
    }

    public static is_inbound_bar(current_word_i : number, current_section_bar : number) : boolean {
        var check_bar : number = this.cal_current_section(current_word_i);
        return current_section_bar == check_bar;
    }
}