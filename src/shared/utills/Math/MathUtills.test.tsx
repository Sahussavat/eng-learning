
import { describe, expect, it } from "vitest";
import { clamp } from "./MathUtills";


describe("MathUtills", ()=> {
    describe("clamp", ()=> {
        it("return the value between min and max correctly", ()=> {
            var min : number = 5;
            var max : number = 10;
            var v : number = 7;
            expect(clamp(0, min, max)).toEqual(min);
            expect(clamp(99, min, max)).toEqual(max);
            expect(clamp(v, min, max)).toEqual(v);
        })
    })
});