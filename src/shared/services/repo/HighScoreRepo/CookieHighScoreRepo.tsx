import { HighScoreModel } from "../../../models/HighScoreModel/HighScoreModel";
import { SaveNLoad } from "../../cookie/SaveNLoadCookies";
import type { HighScoreRepo } from "./HighScoreRepo";

export class CookieHighScore implements HighScoreRepo {
    private static readonly COOKIE_HIGH_SCORE_SAVE_NAME : string = "COOKIE_HIGH_SCORE_SAVE_NAME";
    
    save(high_score_model : HighScoreModel) : void {
        SaveNLoad.save(CookieHighScore.COOKIE_HIGH_SCORE_SAVE_NAME, high_score_model);
    }

    load() : HighScoreModel {
        var data = SaveNLoad.load(CookieHighScore.COOKIE_HIGH_SCORE_SAVE_NAME);
        var model : HighScoreModel = Object.assign(new HighScoreModel(), data);
        return model;
    }

    is_have_save() : boolean {
        return SaveNLoad.is_has_save(CookieHighScore.COOKIE_HIGH_SCORE_SAVE_NAME);
    }

}