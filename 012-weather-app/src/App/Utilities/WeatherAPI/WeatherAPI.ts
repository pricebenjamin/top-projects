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
  condition: string;
}

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
}

export interface DailyWeather {
  date: string;
  timestamp: number;
  avgTempF: number;
  minTempF: number;
  maxTempF: number;
  condition: string;
}

export class WeatherAPI {
  #key: string = "";

  setKey(key: string) {
    this.#key = key;
    // check for invalid key
  }

  async current(location: string): Promise<CurrentWeather> {
    const endpoint = this.createURL("current.json", { q: location });
    const response = await fetch(endpoint);

    const {
      current: {
        last_updated_epoch,
        temp_f,
        condition: { text },
      },
    } = (await response.json()) as API_Response_Current;

    // convert epoch seconds to milliseconds
    const timestamp_ms = last_updated_epoch * 1000;

    return {
      lastUpdated: new Date(timestamp_ms),
      temperatureF: temp_f,
      condition: text,
    };
  }

  async forecast(location: string, days: 1 | 2 | 3): Promise<DailyWeather[]> {
    const endpoint = this.createURL("forecast.json", {
      q: location,
      days: String(days),
    });

    const response = await fetch(endpoint);
    const {
      forecast: { forecastday },
    } = (await response.json()) as API_Response_Forecast;

    return forecastday.map((day) => {
      const {
        date,
        date_epoch,
        day: {
          avgtemp_f,
          mintemp_f,
          maxtemp_f,
          condition: { text },
        },
      } = day;

      return {
        date,
        timestamp: date_epoch,
        avgTempF: avgtemp_f,
        minTempF: mintemp_f,
        maxTempF: maxtemp_f,
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
