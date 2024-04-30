import type { ShipClass, ShipOrientation } from "App/Types";
import { BOARD_HEIGHT, BOARD_WIDTH, BOARD_SIZE } from "App/Constants";

export class Ship {
  class: ShipClass;
  location: number;
  orientation: ShipOrientation;

  constructor(cls: ShipClass, location: number, orientation: ShipOrientation) {
    this.class = cls;
    this.location = location;
    this.orientation = orientation;

    // ensure ship does not overflow the board
    if (this.orientation === "horizontal") {
      const col = this.location % BOARD_WIDTH;
      const overflow = col + this.size - BOARD_WIDTH;
      if (overflow > 0) {
        throw new Error(`${this.toString()} overflows the board`);
      }
    } else {
      const row = Math.floor(this.location / BOARD_WIDTH);
      const overflow = row + this.size - BOARD_HEIGHT;
      if (overflow > 0) {
        throw new Error(`${this.toString()} overflows the board`);
      }
    }
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
      : coordinates.map((_, idx) => this.location + idx * BOARD_WIDTH);
  }

  toString() {
    return `${this.orientation} ${this.class} at location ${this.location}`;
  }

  copy() {
    return new Ship(this.class, this.location, this.orientation);
  }

  move(direction: "up" | "down" | "left" | "right") {
    // when moving, we must prevent the ship from:
    //   1. moving any cell off of the board
    //   2. spanning more than one row when horizontal

    // location = col + row * WIDTH
    // row = Math.floor(location / WIDTH)
    // col = location % WIDTH

    const coords = this.coordinates;

    const head = {
      row: Math.floor(coords.at(0)! / BOARD_WIDTH),
      col: coords.at(0)! % BOARD_WIDTH,
    };

    const tail = {
      row: Math.floor(coords.at(-1)! / BOARD_WIDTH),
      col: coords.at(-1)! % BOARD_WIDTH,
    };

    switch (direction) {
      case "up":
        if (head.row === 0) break;
        this.location -= BOARD_WIDTH;
        break;
      case "down":
        if (tail.row === BOARD_HEIGHT - 1) break;
        this.location += BOARD_WIDTH;
        break;
      case "left":
        if (head.col === 0) break;
        this.location -= 1;
        break;
      case "right":
        if (tail.col === BOARD_WIDTH - 1) break;
        this.location += 1;
        break;
    }

    return this;
  }

  rotate() {
    // We allow the ship to rotate regardless of position on the board.
    // In order to allow this, the ship may be shifted up or to the left
    // if the rotation would cause the ship to overflow the board.

    if (this.orientation === "horizontal") {
      // shift up if too close to bottom edge
      const row = Math.floor(this.location / BOARD_WIDTH);
      const overflow = row + this.size - BOARD_HEIGHT;
      if (overflow > 0) {
        this.location -= overflow * BOARD_WIDTH;
      }
      this.orientation = "vertical";
    } else {
      // shift left if too close to right edge
      const col = this.location % BOARD_WIDTH;
      const overflow = col + this.size - BOARD_WIDTH;
      if (overflow > 0) {
        this.location -= overflow;
      }
      this.orientation = "horizontal";
    }
    return this;
  }

  static random(cls: ShipClass) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const s = new Ship(
          cls,
          Math.floor(BOARD_SIZE * Math.random()),
          Math.random() > 0.5 ? "horizontal" : "vertical"
        );
        return s;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
