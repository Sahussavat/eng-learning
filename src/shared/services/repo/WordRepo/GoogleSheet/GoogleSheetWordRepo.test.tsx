import { describe, it, beforeEach, expect } from "vitest";
import { GoogleSheetJSON } from "../../../api/googlesheetjson";
import { GoogleSheetWordRepo } from "./GoogleSheetWordRepo";

describe("GoogleSheetWordRepo", ()=> {
    
    var google_sheet_service : GoogleSheetJSON;
    var google_sheet_word_repo : GoogleSheetWordRepo;

    async function get_empty1() : Promise<Array<string>> {
        return [];
    }

    async function get_empty2() : Promise<Array<string>> {
        return [];
    }

    beforeEach(()=>{
        google_sheet_service = new GoogleSheetJSON("weqwewqew");
        google_sheet_word_repo = new GoogleSheetWordRepo(google_sheet_service);
    });
    
    describe("get_all_words_count", ()=>{
        it("get all words count correctly", async ()=>{
            const expected_count : number = 5;
            
            async function get_count_data() : Promise<Array<string>> {
                return [expected_count+""];
            }
            google_sheet_service.get_data = get_count_data;
            var data : number = await google_sheet_word_repo.get_all_words_count();
            expect(data).toEqual(expected_count);
            google_sheet_service.get_data = get_empty1;
            data = await google_sheet_word_repo.get_all_words_count();
            expect(data).toEqual(0);
            google_sheet_service.get_data = get_empty2;
            data = await google_sheet_word_repo.get_all_words_count();
            expect(data).toEqual(0);
        });
    });

    describe("get_words_from", ()=>{
        it("get words correctly", async ()=>{
            var expected_word : Array<string> = ["Jack", "Bob", "Adam"];
            async function get_all_words() : Promise<Array<string>> {
                return expected_word;
            }
            
            google_sheet_service.get_data = get_all_words;
            var data : string[] = (await google_sheet_word_repo.get_words_from(1, 100)).get_words();
            expect(data).toStrictEqual(expected_word);
            google_sheet_service.get_data = get_empty1;
            data = (await google_sheet_word_repo.get_words_from(1, 100)).get_words();
            expect(data).toStrictEqual([]);
            google_sheet_service.get_data = get_empty2;
            data = (await google_sheet_word_repo.get_words_from(1, 100)).get_words();
            expect(data).toStrictEqual([]);
        });
    });
})