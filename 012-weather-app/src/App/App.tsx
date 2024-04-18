import { useState, useEffect } from "react";
import { LocationSearch, Forecast, Weather } from "App/Components";
import { WeatherAPI } from "App/Utilities";
import type { Location, CurrentWeather, DailyWeather } from "App/Interfaces";
import type { TemperatureUnit } from "App/Types";
import "./App.css";

let API_KEY = null;

try {
  const module = await import("../WeatherAPIKey");
  API_KEY = module.API_KEY;
} catch (err) {
  console.log(err);
}

if (!API_KEY) {
  API_KEY = prompt("Please enter your WeatherAPI key");
}

const weather = new WeatherAPI(API_KEY ?? "");

function App() {
  const [unit, setUnit] = useState<TemperatureUnit>("F");
  const [location, setLocation] = useState<Location>({
    id: "id:2670799",
    name: "Pullman",
    region: "Washington",
    country: "United States of America",
  });

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }

    let active = true;

    const debounce = setTimeout(() => {
      weather
        .search(searchText)
        .then((results) => {
          if (active) {
            setSearchResults(results);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 200);

    return () => {
      active = false;
      clearTimeout(debounce);
    };
  }, [searchText]);

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();

  useEffect(() => {
    setCurrentWeather(undefined);

    if (!location) return;

    let active = true;

    weather
      .current(location.id)
      .then((result) => {
        if (active) {
          setCurrentWeather({ ...result });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      active = false;
    };
  }, [location]);

  const [forecast, setForecast] = useState<DailyWeather[]>();

  useEffect(() => {
    setForecast(undefined);

    if (!location) return;

    let active = true;

    weather
      .forecast(location.id)
      .then((result) => {
        if (active) {
          setForecast([...result]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      active = false;
    };
  }, [location]);

  return (
    <>
      <header>
        <button
          className="toggle-units"
          onClick={() => setUnit(unit === "F" ? "C" : "F")}
        >
          &deg;{unit === "F" ? "C" : "F"}
        </button>
        <LocationSearch
          searchText={searchText}
          searchResults={searchResults}
          onSearchTextChange={setSearchText}
          onSelect={setLocation}
        />
      </header>
      <div className="content">
        <Weather
          currentWeather={currentWeather}
          location={location}
          unit={unit}
        />
        <Forecast forecast={forecast} unit={unit} />
      </div>
      <div className="api-key">
        {weather.getKey() === "" ? (
          <p>No API key provided</p>
        ) : (
          <p>API Key: {weather.getKey()}</p>
        )}
      </div>
    </>
  );
}

export default App;
