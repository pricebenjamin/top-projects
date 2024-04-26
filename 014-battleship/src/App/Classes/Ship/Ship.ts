import type { ShipClass, ShipOrientation } from "App/Types";
import { BOARD_COLS } from "App/Constants";

export class Ship {
  class: ShipClass;
  location: number;
  orientation: ShipOrientation;

  // TODO(ben): consider change to
  //   constructor({cls, location, orientation}: IShip)
  //   to allow named parameters

  constructor(cls: ShipClass, location: number, orientation: ShipOrientation) {
    // TODO(ben): `class` is probably not a good property name
    this.class = cls;
    this.location = location;
    this.orientation = orientation;
  }

  get size(): number {
    switch (this.class) {
      case "Carrier":
        return 5;
      case "Battleship":
        return 4;
      case "Destroyer":
        return 3;
      case "Submarine":
        return 3;
      case "Patrol Boat":
        return 2;
    }
  }

  get coordinates() {
    const coordinates = Array(this.size).fill(0);

    return this.orientation === "horizontal"
      ? coordinates.map((_, idx) => this.location + idx)
      : coordinates.map((_, idx) => this.location + idx * BOARD_COLS);
  }
}
