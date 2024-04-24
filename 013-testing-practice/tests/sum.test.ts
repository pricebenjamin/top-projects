import { describe, expect, it } from "@jest/globals";
import { sum } from "../src/sum";

describe("sum", () => {
  it("adds two numbers", () => {
    const tests = [
      { args: [0, 1], result: 1 },
      { args: [2, 2], result: 4 },
      { args: [0, -1], result: -1 },
    ];

    for (const { args, result } of tests) {
      const [a, b] = args;
      expect(sum(a, b)).toEqual(result);
    }
  });
});
