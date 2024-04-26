import { Ship } from "App/Classes";

export function rotateShip(ship: Ship) {
  const orientation =
    ship.orientation === "horizontal" ? "vertical" : "horizontal";
  return new Ship(ship.class, ship.location, orientation);
}
