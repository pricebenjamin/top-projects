import type { CurrentWeather, Location } from "App/Interfaces";
import type { TemperatureUnit } from "App/Types";
import { weatherIconLookup } from "App/Utilities/WeatherIconLookup";
import "./Weather.css";

interface WeatherProps {
  currentWeather?: CurrentWeather;
  location: Location;
  unit: TemperatureUnit;
}

export function Weather({ currentWeather, location, unit }: WeatherProps) {
  return (
    currentWeather && (
      <div className="current-weather">
        <div className="column">
          <img
            src={weatherIconLookup(currentWeather.code, currentWeather.isDay)}
            alt="Sunny"
            className="large-icon"
          />
        </div>
        <div className="column">
          <div className="temperature">
            {unit === "F"
              ? currentWeather.temperatureF
              : currentWeather.temperatureC}
            &nbsp;&deg;{unit}
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
          <p className="location-region">{location.region}</p>
        </div>
      </div>
    )
  );
}
