export const FLOAT_PRECISION_IN_DIGITS = 8;
export class Calculator {
  add(a: number, b: number) {
    return a + b;
  }

  subtract(a: number, b: number) {
    return a - b;
  }

  divide(a: number, b: number) {
    if (b === 0) return undefined;
    return a / b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }
}
