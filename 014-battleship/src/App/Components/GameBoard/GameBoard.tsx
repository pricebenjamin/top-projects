import { Square } from "./Components";
import type { SquareStatus } from "App/Types";
import "./GameBoard.css";

interface GameBoardProps {
  playable: boolean;
  squares: SquareStatus[];
  shipCoordinates?: number[];
  onSquareClick: (index: number) => void;
}

export function GameBoard({
  playable,
  squares,
  shipCoordinates,
  onSquareClick,
}: GameBoardProps) {
  return (
    <div className={`gameboard ${playable ? "playable" : ""}`}>
      {squares.map((status, idx) => {
        return (
          <Square
            key={idx}
            index={idx}
            status={status}
            occupied={shipCoordinates?.includes(idx) ?? false}
            onClick={onSquareClick}
          />
        );
      })}
    </div>
  );
}
