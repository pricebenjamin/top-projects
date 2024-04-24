export function analyzeArray(values: number[]) {
  let min = values[0];
  let max = values[0];
  let sum = 0;

  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
    sum += value;
  }

  const length = values.length;
  const average = length > 0 ? sum / length : null;

  return {
    average,
    length,
    min: min ?? null,
    max: max ?? null,
  };
}
