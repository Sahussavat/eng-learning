import { useEffect, useRef, useState } from "react";
import { ProgressModel } from "../../shared/models/ProgressModel/ProgressModel";
import type { ProgressRepo } from "../../shared/services/repo/ProgressRepo/ProgressRepo";
import { CookieProgressRepo } from "../../shared/services/repo/ProgressRepo/CookieProgressRepo";
import type { HighScoreRepo } from "../../shared/services/repo/HighScoreRepo/HighScoreRepo";
import { CookieHighScore } from "../../shared/services/repo/HighScoreRepo/CookieHighScoreRepo";
import type { HighScoreModel } from "../../shared/models/HighScoreModel/HighScoreModel";
import type { Wordrepository } from "../../shared/services/repo/WordRepo/WordRepository";
import { GoogleSheetWordRepo } from "../../shared/services/repo/WordRepo/GoogleSheet/GoogleSheetWordRepo";

export const PAGE = {
    LOADING: "LOADING",
    HOME_PAGE: "HOME_PAGE",
} as const;

type PAGE = (typeof PAGE)[keyof typeof PAGE];

export type MainPageViewModel = ReturnType<typeof MainPageViewModel>;

export function MainPageViewModel() {
    var progress_repo : ProgressRepo = new CookieProgressRepo();
    var high_score_repo : HighScoreRepo = new CookieHighScore();
    var words_repo : Wordrepository = new GoogleSheetWordRepo();
    const [highest_score, setHighestScore] = useState<number>(0);
    const [page, setPage] = useState<PAGE>(PAGE.LOADING);
    const [max_words_total, setMaxWordsTotal] = useState<number>(0);
    const high_score_model = useRef<HighScoreModel>(high_score_repo.load());
    const target_start_i = useRef<number>(1);

    useEffect(()=>{
        init();
    }, [])

    async function init() {
        setPage(PAGE.LOADING);
        setHighestScore(high_score_model.current.get_high_score());
        setMaxWordsTotal(await words_repo.get_all_words_count());
        setPage(PAGE.HOME_PAGE);
    }

    function do_reset_progress_save() {
        var new_save = new ProgressModel();
        new_save.set_current_start_i(target_start_i.current - 1);
        progress_repo.save(new_save);
    }

    function set_start_i_input(event : React.ChangeEvent<HTMLInputElement>) {
        var v : number = Number(event.target.value);
        if (!isNaN(v)){
            target_start_i.current = v;
        }
    }

    return {
        do_reset_progress_save,
        set_start_i_input,
        highest_score,
        progress_repo,
        page,
        max_words_total,
    };
}