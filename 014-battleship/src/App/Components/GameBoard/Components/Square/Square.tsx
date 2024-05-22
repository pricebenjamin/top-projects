import type { SquareStatus } from "App/Types";
import "./Square.css";

interface SquareProps {
  index: number;
  status: SquareStatus;
  onClick: (index: number) => void;
}

export function Square({ index, status, onClick }: SquareProps) {
  return (
    <div className={`square ${status ?? ""}`} onClick={() => onClick(index)}>
      {index}
    </div>
  );
}
