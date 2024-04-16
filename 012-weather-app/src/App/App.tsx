import { useState, useEffect } from "react";

import { Forecast } from "@components/Forecast";
import { LocationSearch } from "@components/LocationSearch";
import { Menu } from "@components/Menu";
import { Weather } from "@components/Weather";
import { WeatherAPI, Location } from "@utils/WeatherAPI";
import "./App.css";

const weather = new WeatherAPI();

interface AppProps {
  apiKey: string | null;
}

function App({ apiKey }: AppProps) {
  const [location, setLocation] = useState<Location>({
    id: "id:2670799",
    name: "Pullman",
    region: "Washington",
    country: "United States of America",
  });

  useEffect(() => {
    weather.setKey(apiKey ?? "");
  }, [apiKey]);

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
