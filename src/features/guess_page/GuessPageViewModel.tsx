import { useEffect, useRef, useState } from "react";
import { ProgressModel } from "../../shared/models/ProgressModel/ProgressModel";
import { CookieProgressRepo } from "../../shared/services/repo/ProgressRepo/CookieProgressRepo";
import type { HighScoreRepo } from "../../shared/services/repo/HighScoreRepo/HighScoreRepo";
import { CookieHighScore } from "../../shared/services/repo/HighScoreRepo/CookieHighScoreRepo";
import type { Wordrepository } from "../../shared/services/repo/WordRepo/WordRepository";
import { GoogleSheetWordRepo } from "../../shared/services/repo/WordRepo/GoogleSheet/GoogleSheetWordRepo";
import { WordsModel } from "../../shared/models/WordModel/WordsModel";
import { GuessSystem } from "./domain/GuessSystem";

export const PAGE = {
    LOADING: "LOADING",
    GUESS_PAGE: "GUESS_PAGE",
    TO_SCORE: "TO_SCORE",
} as const;

type PAGE = (typeof PAGE)[keyof typeof PAGE];

export type GuessPageViewModel = ReturnType<typeof GuessPageViewModel>

export function GuessPageViewModel() {
    
    var progress_repo = new CookieProgressRepo();
    var high_sore_repo : HighScoreRepo = new CookieHighScore();
    var words_repo : Wordrepository = new GoogleSheetWordRepo();
    const [page, setPage] = useState<PAGE>(PAGE.LOADING);
    const [word, setWord] = useState<string>("");
    const [show_hint, setShowHint] = useState<boolean>(false);
    const [current_i, setCurrentI] = useState<number>(0);
    const [max_words_total, setMaxWordsTotal] = useState<number>(0);
    const current_section_bar = useRef<number>(-1);
    const [is_wait_load_data, setIsWaitLoadData] = useState<boolean>(false);
    const progress_model = useRef<ProgressModel>(progress_repo.load());
    const words_model = useRef<WordsModel>(new WordsModel());
    var high_score_model = high_sore_repo.load();

    useEffect(()=>{
        init_page();
    }, []);

    async function init_page() {
        setPage(PAGE.LOADING);
        await set_page_data();
        if (await is_it_out_words()) {
            setPage(PAGE.GUESS_PAGE);
        } else {
            setPage(PAGE.TO_SCORE);
        }
        
    }

    async function set_page_data() {
        var current_word_i : number = progress_model.current.get_current_word_i();
        if (!GuessSystem.is_i_still_under_bar(current_word_i, current_section_bar.current)) {
            setIsWaitLoadData(true);
            words_model.current = await words_repo.get_words_between_index(current_word_i);
            words_model.current.shuffle(progress_model.current.get_current_seed());
            setMaxWordsTotal(await words_repo.get_all_words_count());
            setIsWaitLoadData(false);
        }
        current_section_bar.current = GuessSystem.cal_current_section(current_word_i);
        setCurrentI(current_word_i + 1);
        setWord(words_model.current.get_one_word(current_word_i));
        setShowHint(false);
    }

    async function do_next_word() {
        if (await is_it_out_words()) {
            if (!show_hint) {
                progress_model.current.increase_current_score();
            }
            progress_model.current.increase_current_word_i();
            high_score_model.set_high_score(progress_model.current.get_current_score());
            progress_repo.save(progress_model.current);
            high_sore_repo.save(high_score_model);
            set_page_data();
        } else {
            setPage(PAGE.TO_SCORE);
        }
    }

    async function is_it_out_words() : Promise<boolean> {
        var words_total_count : number = await words_repo.get_all_words_count();
        return progress_model.current.get_current_word_i() < words_total_count - 1;
    }

    function do_reset() {
        var old_start_i : number = progress_model.current.get_current_start_i();
        progress_model.current = Object.assign(progress_model.current, new ProgressModel());
        progress_model.current.set_current_start_i(old_start_i);
        set_page_data();
    }

    function do_show_hint() {
        setShowHint(true);
    }

    return {
        page,
        word,
        current_i,
        show_hint,
        max_words_total,
        is_wait_load_data,
        do_next_word,
        do_show_hint,
        do_reset,
    };
}