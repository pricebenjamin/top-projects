import { useState, useEffect, useRef } from "react";
import {
  WeatherAPI,
  CurrentWeather,
  DailyWeather,
  Location,
} from "@utils/WeatherAPI";
import "./App.css";

const weather = new WeatherAPI();

interface AppProps {
  apiKey: string | null;
}

function App({ apiKey }: AppProps) {
  const [location, setLocation] = useState<Location>();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [forecast, setForecast] = useState<DailyWeather[]>();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  useEffect(() => {
    weather.setKey(apiKey ?? "");
  }, [apiKey]);

  const searchTimer = useRef(null);

  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }

    searchTimer.current && clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      weather
        .search(searchText)
        .then((result) => setSearchResults([...result]))
        .catch((error) => console.log(error));
    }, 300);
  }, [searchText]);

  useEffect(() => {
    setCurrentWeather(undefined);

    if (!location) return;

    weather
      .current(location.id)
      .then((result) => {
        setCurrentWeather({ ...result });
      })
      .catch((error) => console.log(error));
  }, [location]);

  useEffect(() => {
    setForecast(undefined);

    if (!location) return;

    weather
      .forecast(location.id, 3)
      .then((result) => {
        setForecast([...result]);
      })
      .catch((error) => console.log(error));
  }, [location]);

  const currentLocation = location
    ? `${location.name}, ${location.region}, ${location.country}`
    : undefined;

  function selectLocation(location: Location) {
    setLocation(location);
    setSearchText("");
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={searchText}
          placeholder="Search for a location..."
          onChange={(event) => setSearchText(event.target.value)}
        />
        <div className="results">
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((location) => (
                <li
                  key={location.id}
                  tabIndex={0}
                  onClick={() => selectLocation(location)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") selectLocation(location);
                  }}
                >{`${location.name}, ${location.region}, ${location.country}`}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="current-location">
        {currentLocation ?? "No location selected"}
        <button onClick={() => setLocation(undefined)} className="clear">
          Clear Location
        </button>
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
      <div className="api-key">
        {apiKey === null ? (
          <p>No API key provided</p>
        ) : (
          <p>API Key: {apiKey}</p>
        )}
      </div>
    </>
  );
}

export default App;
