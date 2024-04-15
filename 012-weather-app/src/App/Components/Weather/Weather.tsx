import { useEffect, useState } from "react";

import { CurrentWeather, Location, WeatherAPI } from "@utils/WeatherAPI";

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

  const currentLocation = location
    ? `${location.name}, ${location.region}, ${location.country}`
    : undefined;

  return (
    <>
      <div className="current-location">
        {currentLocation ?? "No location selected"}
      </div>
      {currentWeather && (
        <div className="current-weather">
          <div className="temperature">{currentWeather.temperatureF} °F</div>
          <div className="condition">{currentWeather.condition}</div>
          <div className="last-updated">
            {currentWeather.lastUpdated.toLocaleString()}
          </div>
        </div>
      )}
    </>
  );
}
