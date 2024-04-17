import { DailyWeather } from "@utils/WeatherAPI";
import "./Forecast.css";

interface ForecastProps {
  forecast?: DailyWeather[];
}

export function Forecast({ forecast }: ForecastProps) {
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
