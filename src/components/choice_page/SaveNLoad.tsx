import { Cookies } from "react-cookie";

export interface TemplateSaveContinue {
    seed : string,
    current_i : number,
}

export interface TemplateSaveHighestScore {
    highest_score : number,
    current_score: number,
}

export class SaveNLoad {
    static readonly CONTINUE_SAVE_NAME : string = "guess_save"
    static readonly HIGHEST_SCORE_SAVE_NAME : string = "score_save"

    static score_save(templateSave : TemplateSaveHighestScore){
        this.save(SaveNLoad.HIGHEST_SCORE_SAVE_NAME, templateSave)
    }

    static score_load(){
        return this.load(SaveNLoad.HIGHEST_SCORE_SAVE_NAME)
    }

    static continue_save(templateSave : TemplateSaveContinue){
        this.save(SaveNLoad.CONTINUE_SAVE_NAME, templateSave)
    }

    static continue_load(){
        return this.load(SaveNLoad.CONTINUE_SAVE_NAME)
    }

    static save(save_name : string, templateSave : TemplateSaveContinue | TemplateSaveHighestScore){
        (new Cookies).set(save_name, JSON.stringify(templateSave), {
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        });
    }

    static load(save_name : string){
        let data = (new Cookies).get(save_name)
        if(data){
            return data
        } else {
            return {}
        }
    }

    static is_has_save(save_name : string){
        let data = this.load(save_name)
        return Boolean(data && Object.keys(data).length)
    }
}