import type { SquareStatus } from "App/Types";
import { Ship } from "App/Classes";

export interface Player {
  squares: SquareStatus[];
  ships: Ship[];
  setShips: (ships: Ship[]) => void;
  targets: number[];
  setTargets: (targets: number[]) => void;
}
