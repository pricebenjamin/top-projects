import { useState, useEffect } from "react";

import { Forecast } from "@components/Forecast";
import { LocationSearch } from "@components/LocationSearch";
import { Weather } from "@components/Weather";
import { WeatherAPI, Location } from "@utils/WeatherAPI";
import "./App.css";

const weather = new WeatherAPI();

interface AppProps {
  apiKey: string | null;
}

function App({ apiKey }: AppProps) {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    weather.setKey(apiKey ?? "");
  }, [apiKey]);

  return (
    <>
      <LocationSearch weatherAPI={weather} onSelect={setLocation} />
      {location && <Weather weatherAPI={weather} location={location} />}
      {location && (
        <Forecast weatherAPI={weather} location={location} days={3} />
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
