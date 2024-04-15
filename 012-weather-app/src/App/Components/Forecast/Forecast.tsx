import { useEffect, useState } from "react";

import { DailyWeather, Location, WeatherAPI } from "@utils/WeatherAPI";
import "./Forecast.css";

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
    forecast && (
      <div className="forecast">
        <div className="card">
          {forecast.length > 0 ? (
            <table>
              <caption>Forecast</caption>
              <tbody>
                {forecast.map((day) => (
                  <tr className="daily-weather" key={day.date.valueOf()}>
                    <td>
                      {Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                        timeZone: "UTC",
                      }).format(day.date)}
                    </td>
                    <td>{day.condition}</td>
                    <td>{day.avgTempF}&nbsp;&deg;F</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="try-again">
              Unable to load forecast. Please try again later.
            </h1>
          )}
        </div>
      </div>
    )
  );
}
