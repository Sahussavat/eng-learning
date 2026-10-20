
export class ProgressModel {
    private current_word_i : number;
    private current_start_i : number;
    private current_seed : string;
    private current_score : number;

    constructor(current_word_i : number = 0, current_start_i : number = 0
        , current_seed : string = Date.now().toString(), current_score : number = 0){
        this.current_word_i = current_word_i;
        this.current_start_i = current_start_i;
        this.current_seed = current_seed;
        this.current_score = current_score;
    }

    public get_current_word_i() : number {
        return Math.max(this.current_word_i, this.current_start_i);
    }

    public increase_current_word_i() : void {
        this.set_current_word_i(this.get_current_word_i() + 1);
    }

    public set_current_word_i(word_i : number) : void {
        this.current_word_i = Math.max(word_i, 0);
    }

    public get_current_seed() : string {
        return this.current_seed;
    }

    public set_current_seed(seed : string) : void {
        this.current_seed = seed;
    }

    public get_current_start_i() : number {
        return this.current_start_i;
    }

    public set_current_start_i(start_i : number) : void {
        this.current_start_i = Math.max(0, start_i);
    }

    public get_current_score() : number {
        return this.current_score;
    }

    public increase_current_score() : void {
        this.set_current_score(this.current_score + 1);
    }

    public set_current_score(score : number) : void {
        this.current_score = Math.max(0, score);
    }
}