import type { SquareStatus } from "App/Types";
import "./Square.css";

interface SquareProps {
  index: number;
  status: SquareStatus;
  occupied: boolean;
  activeShip: boolean;
  onClick: (index: number) => void;
}

export function Square({
  index,
  status,
  occupied,
  activeShip,
  onClick,
}: SquareProps) {
  return (
    <div
      className={`square ${status ?? (occupied ? "occupied" : "")} ${activeShip ? "active" : ""}`}
      onClick={() => onClick(index)}
    >
      {index}
    </div>
  );
}
