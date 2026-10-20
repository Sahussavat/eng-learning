import { describe, expect, it } from "vitest";
import { MockWordRepository } from "./MockWordRepository";

describe("MockWordRepository", ()=>{
    var mock_word_repo : MockWordRepository = new MockWordRepository();

    describe("get_words_from", ()=>{
        it("return words between i correctly", async ()=>{
            var words : String[] = mock_word_repo.get_words();
            var test_w : String[] = (await mock_word_repo.get_words_from(0, 100)).get_words();
            expect(test_w).toStrictEqual(words);
            test_w = (await mock_word_repo.get_words_from(0, 1)).get_words()
            expect(test_w).toStrictEqual([words[0]]);
            test_w = (await mock_word_repo.get_words_from(words.length, 100)).get_words()
            expect(test_w).toStrictEqual([]);
            test_w = (await mock_word_repo.get_words_from(-1, 100)).get_words()
            expect(test_w).toStrictEqual([]);
        });
    });
});