import { describe, expect, it } from "@jest/globals";
import { analyzeArray } from "../src/analyzeArray";

const FLOAT_PRECISION_IN_DIGITS = 8;

describe("analyzeArray", () => {
  it("returns an object with the following properties", () => {
    expect(analyzeArray([])).toHaveProperty("average");
    expect(analyzeArray([])).toHaveProperty("min");
    expect(analyzeArray([])).toHaveProperty("max");
    expect(analyzeArray([])).toHaveProperty("length");
  });

  it("determines the length of the given array", () => {
    expect(analyzeArray([]).length).toEqual(0);
    expect(analyzeArray([0]).length).toEqual(1);
    expect(analyzeArray([0, 0]).length).toEqual(2);
  });

  it("computes the minimum value of the given array", () => {
    expect(analyzeArray([]).min).toBeNull();
    expect(analyzeArray([0, 1]).min).toEqual(0);
    expect(analyzeArray([0, -1]).min).toEqual(-1);
    expect(analyzeArray([1, 2]).min).toEqual(1);
  });

  it("computes the maximum value of the given array", () => {
    expect(analyzeArray([]).max).toBeNull();
    expect(analyzeArray([0, 1]).max).toEqual(1);
    expect(analyzeArray([0, -1]).max).toEqual(0);
    expect(analyzeArray([1, 2]).max).toEqual(2);
  });

  it("computes the average value of the given array", () => {
    expect(analyzeArray([]).average).toBeNull();
    expect(analyzeArray([0]).average).toEqual(0);
    expect(analyzeArray([0, 1]).average).toBeCloseTo(
      0.5,
      FLOAT_PRECISION_IN_DIGITS
    );
    expect(analyzeArray([-1, 1]).average).toBeCloseTo(
      0,
      FLOAT_PRECISION_IN_DIGITS
    );
  });
});
