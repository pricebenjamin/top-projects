import { describe, expect, it } from "@jest/globals";
import { reverseString } from "../src/reverseString";

describe("reverseString", () => {
  it("handles the null string", () => {
    expect(reverseString("")).toEqual("");
  });

  it("returns the reverse of the given string", () => {
    expect(reverseString("hello")).toEqual("olleh");
    expect(reverseString("foo")).toEqual("oof");
  });

  it("handles at least some diacritics", () => {
    expect(reverseString("naïve")).toEqual("evïan");
  });
});
