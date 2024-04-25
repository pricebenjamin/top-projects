export interface Ship {
  class: "Carrier" | "Battleship" | "Destroyer" | "Submarine" | "Patrol Boat";
  coordinates: number[];
}
