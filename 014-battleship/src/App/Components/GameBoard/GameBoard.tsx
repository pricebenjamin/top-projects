import { Square } from "./Components";
import type { SquareStatus } from "App/Types";
import "./GameBoard.css";

interface GameBoardProps {
  squares: SquareStatus[];
  playable: boolean;
  onSquareClick: (index: number) => void;
}

export function GameBoard({
  squares,
  playable,
  onSquareClick,
}: GameBoardProps) {
  return (
    <div className={`gameboard ${playable ? "playable" : ""}`}>
      {squares.map((status, idx) => (
        <Square
          // NOTE(ben): usage of index as key: squares shall not be
          // inserted, deleted, or reordered
          key={idx}
          index={idx}
          status={status}
          onClick={onSquareClick}
        />
      ))}
    </div>
  );
}
