import { ProgressModel } from "../../../models/ProgressModel/ProgressModel";
import { SaveNLoad } from "../../cookie/SaveNLoadCookies"
import type { ProgressRepo } from "./ProgressRepo";

export class CookieProgressRepo implements ProgressRepo {
    private static readonly COOKIE_PROGRESS_SAVE_NAME : string = "COOKIE_PROGRESS_SAVE_NAME"

    public save(progress_model : ProgressModel) : void {
        SaveNLoad.save(CookieProgressRepo.COOKIE_PROGRESS_SAVE_NAME, progress_model);
    }

    public load() : ProgressModel {
        var data = SaveNLoad.load(CookieProgressRepo.COOKIE_PROGRESS_SAVE_NAME);
        var model : ProgressModel = Object.assign(new ProgressModel(), data);
        return model;
    }

    public is_have_save() : boolean {
        return SaveNLoad.is_has_save(CookieProgressRepo.COOKIE_PROGRESS_SAVE_NAME);
    }
}