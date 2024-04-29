import { Player } from "App/Interfaces";
import "./FleetStatus.css";

interface FleetStatusProps {
  player: Player;
}

export function FleetStatus({ player }: FleetStatusProps) {
  return (
    <div className="fleet-status">
      <ul>
        {player.deployedShips.map((ship) => {
          const alive = ship.coordinates.some(
            (coord) => player.squares[coord] !== "hit"
          );
          return (
            <li key={ship.class} style={{ color: alive ? "green" : "red" }}>
              {ship.class}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
