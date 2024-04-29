import { Ship } from "App/Classes";
import { ShipClass } from "App/Types";

export function createRandomShipDeployment() {
  const ships: Ship[] = [];
  const classes: ShipClass[] = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  for (const cls of classes) {
    const occupied = new Set(ships.map((ship) => ship.coordinates).flat());
    let s = Ship.random(cls);

    while (s.coordinates.some((coord) => occupied.has(coord))) {
      s = Ship.random(cls);
    }

    ships.push(s);
  }

  return ships;
}
