import { describe, expect, it } from "@jest/globals";
import { Calculator, FLOAT_PRECISION_IN_DIGITS } from "../src/Calculator";

describe("calculator", () => {
  describe("add", () => {
    it("adds two numbers", () => {
      const calc = new Calculator();
      expect(calc.add(0, 0)).toEqual(0);
      expect(calc.add(2, 2)).toEqual(4);
      expect(calc.add(-1, 1)).toEqual(0);
    });
  });

  describe("subtract", () => {
    it("subtracts one number from another", () => {
      const calc = new Calculator();
      expect(calc.subtract(0, 1)).toEqual(-1);
      expect(calc.subtract(10, 9)).toEqual(1);
      expect(calc.subtract(10, 10)).toEqual(0);
    });
  });

  describe("divide", () => {
    it("computes the quotient of two numbers", () => {
      const calc = new Calculator();
      expect(calc.divide(1, 0)).toBeUndefined();
      expect(calc.divide(1, 1)).toEqual(1);
      expect(calc.divide(1, 2)).toBeCloseTo(0.5, FLOAT_PRECISION_IN_DIGITS);
    });
  });

  describe("multiply", () => {
    it("computes the product of two numbers", () => {
      const calc = new Calculator();
      expect(calc.multiply(0, 1)).toEqual(0);
      expect(calc.multiply(1, 3)).toEqual(3);
      expect(calc.multiply(3, -2)).toEqual(-6);
    });
  });

  it("works with floats up to the specified precision", () => {
    const calc = new Calculator();
    expect(calc.add(0.2, 0.1)).toBeCloseTo(0.3, FLOAT_PRECISION_IN_DIGITS);
    expect(calc.subtract(1.1, 1.0)).toBeCloseTo(0.1, FLOAT_PRECISION_IN_DIGITS);
    expect(calc.divide(2.0, 3.0)).toBeCloseTo(
      0.6666666666,
      FLOAT_PRECISION_IN_DIGITS
    );
    expect(calc.multiply(0.9, 10.0)).toBeCloseTo(
      9.0,
      FLOAT_PRECISION_IN_DIGITS
    );
  });
});
