import type { SquareStatus } from "App/Types";
import "./Square.css";

interface SquareProps {
  index: number;
  status: SquareStatus;
  occupied: boolean;
  onClick: (index: number) => void;
}

export function Square({ index, status, occupied, onClick }: SquareProps) {
  return (
    <div
      className={`square ${status ?? (occupied ? "occupied" : "")}`}
      onClick={() => onClick(index)}
    >
      {index}
    </div>
  );
}
