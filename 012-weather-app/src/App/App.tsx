import { useState } from "react";

import { Forecast } from "@components/Forecast";
import { LocationSearch } from "@components/LocationSearch";
import { Menu } from "@components/Menu";
import { Weather } from "@components/Weather";
import { WeatherAPI, Location } from "@utils/WeatherAPI";
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

const weather = new WeatherAPI(API_KEY);

function App() {
  const [location, setLocation] = useState<Location>({
    id: "id:2670799",
    name: "Pullman",
    region: "Washington",
    country: "United States of America",
  });

  return (
    <>
      <nav>
        <Menu />
        <LocationSearch weatherAPI={weather} onSelect={setLocation} />
      </nav>
      <div className="content">
        <Weather weatherAPI={weather} location={location} />
        <Forecast weatherAPI={weather} location={location} days={3} />
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
