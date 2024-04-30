import type { SquareStatus } from "App/Types";
import { BOARD_SIZE, BOARD_WIDTH, BOARD_HEIGHT } from "App/Constants";

export function computeTargetSquare(
  squares: SquareStatus[],
  multiplier: number = 8
) {
  /* strategy:
   * - "checkerboard" squares have some probability of being chosen
   * - squares near previous hits get higher probability, according to some multiplier
   */

  const possibleTargets: number[] = [];

  for (const [idx, status] of squares.entries()) {
    if (status === "hit" || status === "miss") continue;

    const [r, c] = coordinate(idx);

    // checkerboard squares always have a change of being chosen
    if ((r % 2 === 0 && c % 2 === 0) || (r % 2 === 1 && c % 2 === 1)) {
      possibleTargets.push(idx);
    }

    /*
     * Value of each neighbor:
     *   [0  1  0]
     *   [1  X  1]
     *   [0  1  0]
     */
    const neighbors = [
      [1, r - 1, c],
      [1, r, c - 1],
      [1, r, c + 1],
      [1, r + 1, c],
    ];

    for (const [value, row, col] of neighbors) {
      if (row < 0 || row >= BOARD_HEIGHT) continue;
      if (col < 0 || col >= BOARD_WIDTH) continue;
      if (squares[index(row, col)] !== "hit") continue;

      possibleTargets.push(...Array(value * multiplier).fill(idx));
    }
  }

  const choice = Math.floor(possibleTargets.length * Math.random());
  return possibleTargets[choice];
}

function coordinate(index: number) {
  if (index < 0 || index >= BOARD_SIZE) {
    throw new Error(`out of bounds: index = ${index}`);
  }
  return [
    Math.floor(index / BOARD_WIDTH), // row
    index % BOARD_WIDTH, // col
  ];
}

function index(row: number, col: number) {
  if (row >= BOARD_HEIGHT) throw new Error(`out of bounds: row = ${row}`);
  if (col >= BOARD_WIDTH) throw new Error(`out of bounds: col = ${col}`);
  return col + row * BOARD_WIDTH;
}
