import { useEffect, useState } from "react";

import { CurrentWeather, Location, WeatherAPI } from "@utils/WeatherAPI";
import "./Weather.css";

interface WeatherProps {
  weatherAPI: WeatherAPI;
  location: Location;
}

export function Weather({ weatherAPI, location }: WeatherProps) {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();

  useEffect(() => {
    setCurrentWeather(undefined);

    if (!location) return;

    // Avoid race condition if multiple fetches are fired.
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    let active = true;

    weatherAPI
      .current(location.id)
      .then((result) => {
        if (active) {
          setCurrentWeather({ ...result });
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
  }, [weatherAPI, location]);

  return (
    currentWeather && (
      <div className="current-weather">
        <div className="column">
          <div className="temperature">
            {currentWeather.temperatureF}&nbsp;&deg;F
          </div>
          <div className="condition">{currentWeather.condition}</div>
          <div className="last-updated">
            Updated:{" "}
            {new Intl.DateTimeFormat("en-US", {
              timeStyle: "short",
            }).format(currentWeather.lastUpdated)}
          </div>
        </div>
        <div className="column">
          <h1 className="location-name">{location.name}</h1>
          <h2 className="location-region">{location.region}</h2>
        </div>
      </div>
    )
  );
}
