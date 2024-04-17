import { Location } from "@utils/WeatherAPI";
import "./LocationSearch.css";

interface LocationSearchProps {
  searchText: string;
  searchResults: Location[];
  onSearchTextChange: (text: string) => void;
  onSelect: (location: Location) => void;
}

export function LocationSearch({
  searchText,
  searchResults,
  onSearchTextChange,
  onSelect,
}: LocationSearchProps) {
  return (
    <div className="search">
      <input
        type="text"
        value={searchText}
        placeholder="Search for a location..."
        onChange={(event) => onSearchTextChange(event.target.value)}
      />
      <div className="results">
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((location) => (
              <li
                key={location.id}
                tabIndex={0}
                onClick={() => {
                  onSelect(location);
                  onSearchTextChange("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onSelect(location);
                    onSearchTextChange("");
                  }
                }}
              >{`${location.name}, ${location.region}, ${location.country}`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
