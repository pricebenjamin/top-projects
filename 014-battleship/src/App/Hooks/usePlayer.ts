import { useState } from "react";
import type { Ship } from "App/Classes";
import type { SquareStatus } from "App/Types";
import { BOARD_SIZE } from "App/Constants";
import { Player } from "App/Interfaces";

export function usePlayer(initShips: Ship[]): Player {
  const [ships, setShips] = useState<Ship[]>(initShips);
  const [targets, setTargets] = useState<number[]>([]);

  const squares: SquareStatus[] = Array(BOARD_SIZE).fill(null);

  for (const ship of ships) {
    for (const coord of ship.coordinates) {
      squares[coord] = "occupiedByDeployedShip";
    }
  }

  for (const target of targets) {
    if (squares[target] === "occupiedByDeployedShip") {
      squares[target] = "hit";
      continue;
    }
    squares[target] = "miss";
  }

  return {
    squares,
    ships,
    setShips,
    targets,
    setTargets,
  };
}
