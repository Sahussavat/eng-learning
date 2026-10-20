import type { ProgressModel } from "../../../models/ProgressModel/ProgressModel";

export interface ProgressRepo {
    save(progress_model : ProgressModel) : void;
    load() : ProgressModel;
    is_have_save() : boolean;
}