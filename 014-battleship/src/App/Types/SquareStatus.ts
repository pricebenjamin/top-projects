export type SquareStatus =
  | null
  | "hit"
  | "miss"
  | "occupiedByDeployedShip"
  | "occupiedByActiveShip"
  | "invalid"; // reserved for doubly-occupied square during setup
