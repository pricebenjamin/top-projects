export interface CurrentWeather {
  lastUpdated: Date;
  temperatureF: number;
  temperatureC: number;
  condition: string;
  code: number;
  isDay: boolean;
}

export interface DailyWeather {
  date: Date;
  avgTempF: number;
  minTempF: number;
  maxTempF: number;
  avgTempC: number;
  minTempC: number;
  maxTempC: number;
  condition: string;
}
