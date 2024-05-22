import { describe, expect, it } from "vitest";
import { Ship } from "./Ship";
import { BOARD_WIDTH } from "App/Constants";

describe("class Ship", () => {
  it("can create new ships", () => {
    const shipA = new Ship("Carrier", 0, "horizontal");

    expect(shipA.class).toBe("Carrier");
    expect(shipA.location).toBe(0);
    expect(shipA.orientation).toBe("horizontal");

    expect(shipA.size).toBe(5);
    expect(shipA.coordinates).toEqual([0, 1, 2, 3, 4]);

    const shipB = new Ship("Battleship", 1, "vertical");

    expect(shipB.class).toBe("Battleship");
    expect(shipB.location).toBe(1);
    expect(shipB.orientation).toBe("vertical");

    expect(shipB.size).toBe(4);
    expect(shipB.coordinates).toEqual([
      1 + 0 * BOARD_WIDTH,
      1 + 1 * BOARD_WIDTH,
      1 + 2 * BOARD_WIDTH,
      1 + 3 * BOARD_WIDTH,
    ]);
  });

  it("can move up, down, left, right", () => {
    const shipA = new Ship("Patrol Boat", 0, "horizontal");
    expect(shipA.size).toBe(2);
    expect(shipA.coordinates).toEqual([0, 1]);

    shipA.move("down");
    expect(shipA.coordinates).toEqual([
      0 + 1 * BOARD_WIDTH,
      1 + 1 * BOARD_WIDTH,
    ]);

    shipA.move("down");
    expect(shipA.coordinates).toEqual([
      0 + 2 * BOARD_WIDTH,
      1 + 2 * BOARD_WIDTH,
    ]);

    shipA.move("right");
    expect(shipA.coordinates).toEqual([
      1 + 2 * BOARD_WIDTH,
      2 + 2 * BOARD_WIDTH,
    ]);

    shipA.move("right");
    expect(shipA.coordinates).toEqual([
      2 + 2 * BOARD_WIDTH,
      3 + 2 * BOARD_WIDTH,
    ]);

    shipA.move("up");
    expect(shipA.coordinates).toEqual([
      2 + 1 * BOARD_WIDTH,
      3 + 1 * BOARD_WIDTH,
    ]);

    shipA.move("left");
    expect(shipA.coordinates).toEqual([
      1 + 1 * BOARD_WIDTH,
      2 + 1 * BOARD_WIDTH,
    ]);
  });

  it("is prevented from moving if against an edge of the board", () => {
    // location = 0 is the top-left corner
    const shipA = new Ship("Submarine", 0, "horizontal");
    expect(shipA.size).toBe(3);
    expect(shipA.coordinates).toEqual([0, 1, 2]);

    shipA.move("left");
    expect(shipA.coordinates).toEqual([0, 1, 2]);

    shipA.move("up");
    expect(shipA.coordinates).toEqual([0, 1, 2]);

    // location = BOARD_WIDTH - 1 is the top-right corner
    const shipB = new Ship("Destroyer", BOARD_WIDTH - 1, "vertical");
    expect(shipB.coordinates).toEqual([
      BOARD_WIDTH - 1 + 0 * BOARD_WIDTH,
      BOARD_WIDTH - 1 + 1 * BOARD_WIDTH,
      BOARD_WIDTH - 1 + 2 * BOARD_WIDTH,
    ]);

    shipB.move("right");
    expect(shipB.coordinates).toEqual([
      BOARD_WIDTH - 1 + 0 * BOARD_WIDTH,
      BOARD_WIDTH - 1 + 1 * BOARD_WIDTH,
      BOARD_WIDTH - 1 + 2 * BOARD_WIDTH,
    ]);
  });
});
