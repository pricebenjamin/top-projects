import { describe, expect, it } from "@jest/globals";
import { capitalize } from "../src/capitalize";

describe("capitalize", () => {
  it("handles the empty string", () => {
    expect(capitalize("")).toEqual("");
  });

  it("capitalizes the first letter of the given string", () => {
    expect(capitalize("hello")).toEqual("Hello");
    expect(capitalize("goodbye")).toEqual("Goodbye");
  });

  it("can work with at least some diacritics", () => {
    expect(capitalize("é necessário um título do documento")).toEqual(
      "É necessário um título do documento"
    );
  });
});
