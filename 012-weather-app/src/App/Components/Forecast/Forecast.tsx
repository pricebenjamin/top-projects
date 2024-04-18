import { DailyWeather } from "@utils/WeatherAPI";
import type { TemperatureUnit } from "../../Types/TemperatureUnit";
import "./Forecast.css";

interface ForecastProps {
  forecast?: DailyWeather[];
  unit: TemperatureUnit;
}

export function Forecast({ forecast, unit }: ForecastProps) {
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
                    <td>
                      {(unit === "F" ? day.avgTempF : day.avgTempC).toFixed(1)}
                      &nbsp;&deg;
                      {unit}
                    </td>
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
