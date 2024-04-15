import { useEffect, useRef, useState } from "react";

import { Location, WeatherAPI } from "@utils/WeatherAPI";
import "./LocationSearch.css";

interface LocationSearchProps {
  weatherAPI: WeatherAPI;
  onSelect: (location: Location) => void;
}

export function LocationSearch({ weatherAPI, onSelect }: LocationSearchProps) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const searchTimer = useRef(null);

  useEffect(() => {
    searchTimer.current && clearTimeout(searchTimer.current);

    if (!searchText) {
      setSearchResults([]);
      return;
    }

    // Avoid race condition if multiple fetches are fired.
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    let active = true;

    searchTimer.current = setTimeout(() => {
      weatherAPI
        .search(searchText)
        .then((locations) => {
          if (active) {
            setSearchResults([...locations]);
          }
        })
        .catch((error) => {
          if (active) {
            console.log(error);
          }
        });
    }, 300);

    return () => {
      active = false;
    };
  }, [weatherAPI, searchText]);

  function handleUserSelect(location: Location) {
    setSearchText("");
    onSelect(location);
  }

  return (
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
                onClick={() => handleUserSelect(location)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleUserSelect(location);
                }}
              >{`${location.name}, ${location.region}, ${location.country}`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
