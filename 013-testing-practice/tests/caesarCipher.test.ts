import { describe, expect, it } from "@jest/globals";
import { caesarCipher } from "../src/caesarCipher";

describe("caesarCipher", () => {
  it("shifts every character in a string by the given distance", () => {
    expect(caesarCipher("abc", 0)).toEqual("abc");
    expect(caesarCipher("abc", 1)).toEqual("bcd");
    expect(caesarCipher("xyz", 2)).toEqual("zab");
  });

  it("preserves character case", () => {
    expect(caesarCipher("ABC", 0)).toEqual("ABC");
    expect(caesarCipher("aBc", 1)).toEqual("bCd");
  });

  it("preserves non-alphabet characters, including spaces", () => {
    expect(caesarCipher("abc! abc.", 1)).toEqual("bcd! bcd.");
    expect(caesarCipher("0123456789", 2)).toEqual("0123456789");
    expect(caesarCipher("~!@#$%^&*()_+", 3)).toEqual("~!@#$%^&*()_+");
  });

  it("allows negative-valued shifts", () => {
    expect(caesarCipher("abc", -1)).toEqual("zab");
    expect(caesarCipher("abc", -26)).toEqual("abc");
  });
});
