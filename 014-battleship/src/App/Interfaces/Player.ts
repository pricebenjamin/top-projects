import type { SquareStatus } from "App/Types";
import { Ship } from "App/Classes";

export interface Player {
  squares: SquareStatus[];
  deployedShips: Ship[];
}
