import duration from "@/duration.js";
import { isIterable } from "core-js";

describe("Duration", () => {
    it("should be 00:00:05 for 5 seconds", () => {
        expect(duration(5)).toBe("00:00:05");
    });
    it("should be 01:00:00 for 1 hour", () => {
        expect(duration(3600)).toBe("01:00:00");
    });
    it("should be 00:10:00 for 10 minutes", () => {
        expect(duration(600)).toBe("00:10:00");
    });
});