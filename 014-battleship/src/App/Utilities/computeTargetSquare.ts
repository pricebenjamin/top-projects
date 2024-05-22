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

    const [row, col] = coordinate(idx);

    // checkerboard squares always have a chance of being chosen
    if ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)) {
      possibleTargets.push(idx);
    }

    /*
     * Value of each neighbor:
     *   [0  1  0]
     *   [1  X  1]
     *   [0  1  0]
     */
    const neighbors = [
      [1, row - 1, col],
      [1, row, col - 1],
      [1, row, col + 1],
      [1, row + 1, col],
    ];

    for (const [value, neighborRow, neighborCol] of neighbors) {
      if (neighborRow < 0 || neighborRow >= BOARD_HEIGHT) continue;
      if (neighborCol < 0 || neighborCol >= BOARD_WIDTH) continue;
      if (squares[index(neighborRow, neighborCol)] !== "hit") continue;

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
