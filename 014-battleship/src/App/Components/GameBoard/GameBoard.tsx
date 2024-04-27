import { Square } from "./Components";
import type { SquareStatus } from "App/Types";
import { Ship } from "App/Classes";
import "./GameBoard.css";

interface GameBoardProps {
  playable: boolean;
  squares: SquareStatus[];
  shipCoordinates?: number[];
  activeShip?: Ship;
  onSquareClick: (index: number) => void;
}

export function GameBoard({
  playable,
  squares,
  shipCoordinates,
  activeShip,
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
            activeShip={activeShip?.coordinates.includes(idx) ?? false}
            onClick={onSquareClick}
          />
        );
      })}
    </div>
  );
}
