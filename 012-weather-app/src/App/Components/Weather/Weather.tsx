import { CurrentWeather, Location } from "@utils/WeatherAPI";
import { fahrenheitToCelsius } from "@utils/ConvertTemperature";
import type { TemperatureUnit } from "../../Types/TemperatureUnit";
import "./Weather.css";

interface WeatherProps {
  currentWeather?: CurrentWeather;
  location: Location;
  unit: TemperatureUnit;
}

export function Weather({ currentWeather, location, unit }: WeatherProps) {
  function convert(tempF: number) {
    if (unit === "F") return tempF.toFixed(1);
    return fahrenheitToCelsius(tempF).toFixed(1);
  }

  return (
    currentWeather && (
      <div className="current-weather">
        <div className="column">
          <div className="temperature">
            {convert(currentWeather.temperatureF)}&nbsp;&deg;{unit}
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
