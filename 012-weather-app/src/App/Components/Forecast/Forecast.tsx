import type { DailyWeather } from "App/Interfaces";
import type { TemperatureUnit } from "App/Types";
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
              <tbody>
                <tr>
                  <th>{/* Day of Week */}</th>
                  <th>Forecast</th>
                  <th>High</th>
                  <th>Low</th>
                </tr>
                {forecast.map((day) => (
                  <tr className="daily-weather" key={day.date.valueOf()}>
                    <th scope="row">
                      {Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                        timeZone: "UTC",
                      }).format(day.date)}
                    </th>
                    <td>{day.condition}</td>
                    <td style={{ textAlign: "right" }}>
                      {(unit === "F" ? day.maxTempF : day.maxTempC).toFixed(1)}
                      &deg;
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {(unit === "F" ? day.minTempF : day.minTempC).toFixed(1)}
                      &deg;
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
