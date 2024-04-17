export function fahrenheitToCelsius(tempF: number) {
  const tempC = (tempF - 32.0) / 1.8;
  return tempC;
}

export function celsiusToFahrenheit(tempC: number) {
  const tempF = tempC * 1.8 + 32.0;
  return tempF;
}
