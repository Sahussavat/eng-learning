import { GoogleSheetJSON, type Data } from "../../util/googlesheetjson"
import { SaveNLoad } from "./SaveNLoad"
import Rand from "rand-seed" 

export class GuessSystem {

    private readonly DEFAULT_CURRENT_I = 0

    private n_in_segment : number = 5

    private max_guess : number = 0
    private current_i : number = this.DEFAULT_CURRENT_I
    private seed : string | null = null
    private rand : Rand | null = null

    set_continue(){
        let save = this.continue_load()
        
        if(Object.keys(save).length){
            this.current_i = save.current_i
            this.seed = save.seed
        }
    }

    get_next_data(index = this.current_i){
        return this.get_data_by_index(index).then((d)=>{
            let data = d
            if(data.length){
                data = this.shuffleArray(data)
            }
            return data
        })
    }

    increase_current_i(){
        this.current_i++
    }

    shuffleArray(array : Array<Data>) {
        if(this.get_seed()){
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(this.get_rng_seed() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array;
    }

    get_data_by_index(i : number){
        return GoogleSheetJSON.load_data("1SMrtUHsHCzi5tyO_NTIBRTV3LY63QQuk0ZspYtHOkdQ", (n : number)=>{
            this.max_guess = n
            let start = ((Math.floor(i/(this.n_in_segment))) * this.n_in_segment)+1
            let end = Math.min(start + this.n_in_segment-1, n + 1)
            return [start, end]
        }, {
            sheet_name : "ชีต1",
            count_col : "D",
        })
    }

    get_seed(){
        if(!this.seed){
            this.seed = Date.now().toString()
        }
        return this.seed
    }

    reset_seed(){
        this.seed = null
        this.rand = null
    }

    get_rng_seed(){
        if(!this.rand){
            this.rand = new Rand(this.get_seed())
        }
        return this.rand.next()
    }

    continue_save(){
        SaveNLoad.continue_save({
            current_i: this.current_i,
            seed: this.get_seed()
        })
    }

    continue_load(){
        return SaveNLoad.continue_load()
    }

    continue_reset(){
        SaveNLoad.continue_save({
            current_i: this.DEFAULT_CURRENT_I,
            seed: '',
        })
    }

    get_max_guess(){
        return this.max_guess
    }

    get_current_i(){
        return this.current_i
    }

    get_n_in_segment(){
        return this.n_in_segment
    }

}