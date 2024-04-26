import { useState } from "react";
import { GameBoard, GameSetup } from "App/Components";
import { Ship } from "App/Classes";
import type { SquareStatus } from "App/Types";
import { BOARD_SIZE } from "App/Constants";
import "./App.css";

export function App() {
  const [playing, setPlaying] = useState(false);

  const [squares, setSquares] = useState<SquareStatus[]>(
    Array(BOARD_SIZE).fill(null)
  );

  const [deployedShips, setDeployedShips] = useState<Ship[]>([]);
  const shipCoordinates = deployedShips.map((ship) => ship.coordinates).flat();

  return playing ? (
    <div className="flex">
      <GameBoard
        playable={true}
        squares={squares}
        onSquareClick={(index: number) => {
          const nextSquares = [...squares];
          nextSquares[index] = shipCoordinates.includes(index) ? "hit" : "miss";
          setSquares(nextSquares);
        }}
      />
      <GameBoard
        playable={false}
        squares={squares}
        shipCoordinates={shipCoordinates}
        onSquareClick={() => undefined}
      />
    </div>
  ) : (
    <GameSetup
      squares={squares}
      deployedShips={deployedShips}
      setDeployedShips={setDeployedShips}
      onGameStart={() => setPlaying(true)}
    />
  );
}
