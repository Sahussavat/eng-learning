
export class HighScoreModel {
    private high_score : number;

    constructor(high_score : number = 0) {
        this.high_score = high_score;
    }

    public get_high_score() : number {
        return this.high_score;
    }

    public set_high_score(v : number) : void {
        if (v > this.high_score) {
            this.high_score = v;
        }
    }
}