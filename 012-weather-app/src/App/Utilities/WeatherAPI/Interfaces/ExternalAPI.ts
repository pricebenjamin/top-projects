// API-defined (external) interfaces are prefixed with API_ and should not
// be used outside of the WeatherAPI module.

export interface API_Response_Current {
  location: API_Location;
  current: API_Current;
}

interface API_Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface API_Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_f: number;
  temp_c: number;
  feelslike_f: number;
  feelslike_c: number;
  condition: API_Condition;
  // additional data is available but unused
}

interface API_Condition {
  text: string;
  icon: string;
  code: number;
}

export interface API_Response_Forecast {
  location: API_Location;
  current: API_Current;
  forecast: API_Forecast;
}

interface API_Forecast {
  forecastday: API_ForecastDay[];
}

interface API_ForecastDay {
  date: string;
  date_epoch: number;
  day: API_Day;
  astro: API_Astro;
  hour: API_Hour[];
}

interface API_Day {
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_f: number;
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  condition: API_Condition;
  // additional data is available but unused
}

interface API_Astro {
  sunrise: string;
  sunset: string;
  // additional data is available but unused
}

interface API_Hour {
  time_epoch: number;
  time: string;
  temp_f: number;
  feelslike_f: number;
  chance_of_rain: number;
  chance_of_snow: number;
  condition: API_Condition;
  // additional data is available but unused
}

export type API_Response_Search = API_SearchResult[];

interface API_SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
