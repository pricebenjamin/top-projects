import { Ship } from "App/Classes";
import { BOARD_COLS } from "App/Constants";

export function moveShip(
  ship: Ship,
  direction: "up" | "down" | "left" | "right"
) {
  let location = ship.location;

  switch (direction) {
    case "up":
      location -= BOARD_COLS;
      break;
    case "down":
      location += BOARD_COLS;
      break;
    case "left":
      location -= 1;
      break;
    case "right":
      location += 1;
      break;
  }

  return new Ship(ship.class, location, ship.orientation);
}
