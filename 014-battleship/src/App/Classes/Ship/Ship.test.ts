import { describe, expect, it } from "vitest";
import { Ship } from "./Ship";

describe("class Ship", () => {
  it("creates new ship instances", () => {
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
    expect(shipB.coordinates).toEqual([1, 11, 21, 31]);

    // NOTE(ben): ship.coordinates depend on gameboard size.
    // Changing the BOARD_ROWS / BOARD_COLS / BOARD_SIZE constants
    // may cause these tests to fail.
  });
});
