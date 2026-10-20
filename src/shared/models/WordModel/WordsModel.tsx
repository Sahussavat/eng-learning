import Rand from "rand-seed";

export class WordsModel {
    private words : Array<string>;

    constructor(words : Array<string> = []){
        this.words = words;
    }

    public get_words() : Array<string> {
        return this.words;
    }

    public shuffle(seed : string) : void {
        var rand : Rand = new Rand(seed);
        for (let i = this.words.length - 1; i > 0; i--) {
            const j = Math.floor(rand.next() * (i + 1));
            [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
    }

    public get_one_word(i : number) : string {
        return this.words[i%this.words.length];
    }

    public is_have_words() : boolean {
        return this.words.length > 0;
    }
}