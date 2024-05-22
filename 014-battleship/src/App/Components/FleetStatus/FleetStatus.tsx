import { Player } from "App/Interfaces";
import "./FleetStatus.css";

interface FleetStatusProps {
  player: Player;
}

export function FleetStatus({ player }: FleetStatusProps) {
  const activeShips = [];
  const sunkShips = [];

  for (const ship of player.ships) {
    if (ship.coordinates.some((coord) => player.squares[coord] !== "hit")) {
      activeShips.push(ship);
      continue;
    }
    sunkShips.push(ship);
  }

  return (
    <div className="fleet-status">
      <h2 className="score-heading">Score</h2>
      <div className="score">{sunkShips.length}</div>
      {activeShips.length > 0 && (
        <div className="active">
          <h2>Active</h2>
          {activeShips.map((ship) => (
            <div key={ship.class}>{ship.class}</div>
          ))}
        </div>
      )}
      {sunkShips.length > 0 && (
        <div className="sunk">
          <h2>Sunk</h2>
          {sunkShips.map((ship) => (
            <div key={ship.class}>{ship.class}</div>
          ))}
        </div>
      )}
    </div>
  );
}
