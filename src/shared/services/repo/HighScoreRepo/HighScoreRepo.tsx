import type { HighScoreModel } from "../../../models/HighScoreModel/HighScoreModel";

export interface HighScoreRepo {
    save(high_score_model : HighScoreModel) : void;
    load() : HighScoreModel;
    is_have_save() : boolean;
}