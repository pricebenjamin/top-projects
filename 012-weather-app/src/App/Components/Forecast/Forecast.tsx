import { useEffect, useState } from "react";
import { DailyWeather, Location, WeatherAPI } from "@utils/WeatherAPI";

interface ForecastProps {
  weatherAPI: WeatherAPI;
  location: Location;
  days: 1 | 2 | 3;
}

export function Forecast({ weatherAPI, location, days }: ForecastProps) {
  const [forecast, setForecast] = useState<DailyWeather[]>();

  useEffect(() => {
    setForecast(undefined);

    if (!location) return;

    // Avoid race condition if multiple fetches are fired.
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    let active = true;

    weatherAPI
      .forecast(location.id, days)
      .then((result) => {
        if (active) {
          setForecast([...result]);
        }
      })
      .catch((error) => {
        if (active) {
          console.log(error);
        }
      });

    return () => {
      active = false;
    };
  }, [weatherAPI, location, days]);

  return (
    <>
      {forecast && (
        <div className="forecast">
          {forecast.map((day) => (
            <div className="daily-weather" key={day.date}>
              <p>Date: {day.date}</p>
              <p>Average: {day.avgTempF}</p>
              <p>Condition: {day.condition}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
