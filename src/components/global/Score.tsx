import { SaveNLoad } from "./SaveNLoad"


export class Score {
    private current_score = 0
    private highest_score = 0

    increase_score(){
        this.set_current_score(this.current_score+1)    
    }

    set_continue(){
        if(SaveNLoad.is_has_save(SaveNLoad.CONTINUE_SAVE_NAME)){
            let save = this.score_load()
            
            if(Object.keys(save).length){
                this.current_score = save.current_score
                this.highest_score = save.highest_score
            }
        } else {
            this.score_reset_current_score()
        }
    }

    set_highest_score(delta : number){
        if(delta > this.highest_score){
            this.highest_score = delta
        }
    }

    set_cap_highest_score(max : number){
        if(this.highest_score > max){
            this.highest_score = max
        }
    }

    set_current_score(delta : number){
        this.current_score = delta
    }

    get_currnet_score(){
        return this.current_score
    }

    get_highest_score(){
        return this.highest_score
    }

    score_save(){
        SaveNLoad.score_save({
            highest_score: this.highest_score,
            current_score: this.current_score,
        })
    }

    score_load(){
        return SaveNLoad.score_load()
    }

    score_reset_current_score(){
        SaveNLoad.score_save({
            highest_score: this.highest_score,
            current_score: 0,
        })
    }
}