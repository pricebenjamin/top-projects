import { useState, useEffect, useRef } from "react";

import { Forecast } from "@components/Forecast";
import { LocationSearch } from "@components/LocationSearch";
import { Menu } from "@components/Menu";
import { Weather } from "@components/Weather";
import {
  WeatherAPI,
  Location,
  CurrentWeather,
  DailyWeather,
} from "@utils/WeatherAPI";
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
  const [location, setLocation] = useState<Location>({
    id: "id:2670799",
    name: "Pullman",
    region: "Washington",
    country: "United States of America",
  });

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const searchTimer = useRef<number>(null);

  useEffect(() => {
    searchTimer.current && clearTimeout(searchTimer.current);

    if (!searchText) {
      setSearchResults([]);
      return;
    }

    let active = true;

    searchTimer.current = setTimeout(() => {
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
      <nav>
        <Menu />
        <LocationSearch
          searchText={searchText}
          searchResults={searchResults}
          onSearchTextChange={setSearchText}
          onSelect={setLocation}
        />
      </nav>
      <div className="content">
        <Weather currentWeather={currentWeather} location={location} />
        <Forecast forecast={forecast} />
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
