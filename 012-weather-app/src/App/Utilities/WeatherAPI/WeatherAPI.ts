import {
  API_Response_Current,
  API_Response_Forecast,
  API_Response_Search,
} from "./API_Interfaces";

const BASE_URL = "https://api.weatherapi.com/v1/";

type WeatherAPIMethod = "current.json" | "forecast.json" | "search.json";

export interface CurrentWeather {
  lastUpdated: Date;
  temperatureF: number;
  temperatureC: number;
  condition: string;
}

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
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

export class WeatherAPI {
  #key: string = "";

  constructor(key: string) {
    this.#key = key;
  }

  getKey() {
    return this.#key;
  }

  async current(location: string): Promise<CurrentWeather> {
    const endpoint = this.createURL("current.json", { q: location });
    const response = await fetch(endpoint);

    const {
      current: {
        last_updated_epoch,
        temp_f,
        temp_c,
        condition: { text },
      },
    } = (await response.json()) as API_Response_Current;

    // convert epoch seconds to milliseconds
    const timestamp_ms = last_updated_epoch * 1000;

    return {
      lastUpdated: new Date(timestamp_ms),
      temperatureF: temp_f,
      temperatureC: temp_c,
      condition: text,
    };
  }

  async forecast(
    location: string,
    days: 1 | 2 | 3 = 3 // limited by the free API tier
  ): Promise<DailyWeather[]> {
    const endpoint = this.createURL("forecast.json", {
      q: location,
      days: String(days),
    });

    const response = await fetch(endpoint);
    const json = await response.json();

    const {
      forecast: { forecastday },
    } = json as API_Response_Forecast;

    return forecastday.map((day) => {
      const {
        date_epoch,
        day: {
          avgtemp_f,
          mintemp_f,
          maxtemp_f,
          avgtemp_c,
          mintemp_c,
          maxtemp_c,
          condition: { text },
        },
      } = day;

      const timestamp_ms = date_epoch * 1000;

      return {
        date: new Date(timestamp_ms),
        avgTempF: avgtemp_f,
        minTempF: mintemp_f,
        maxTempF: maxtemp_f,
        avgTempC: avgtemp_c,
        minTempC: mintemp_c,
        maxTempC: maxtemp_c,
        condition: text,
      };
    });
  }

  async search(location: string): Promise<Location[]> {
    const endpoint = this.createURL("search.json", { q: location });
    const response = await fetch(endpoint);
    const results = (await response.json()) as API_Response_Search;

    return results.map(({ id, name, region, country }) => {
      return {
        id: `id:${id}`,
        name,
        region,
        country,
      };
    });
  }

  createURL(method: WeatherAPIMethod, params: Record<string, string> = {}) {
    if (!this.#key) {
      throw new Error(
        "Missing API key: provide an API key using the setKey() method"
      );
    }

    const url = new URL(method, BASE_URL);
    const searchParams = new URLSearchParams(params);

    searchParams.set("key", this.#key);

    return `${url}?${searchParams}`;
  }
}
