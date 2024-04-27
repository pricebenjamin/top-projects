import { useState } from "react";
import { GameBoard, GameSetup } from "App/Components";
import { Ship } from "App/Classes";
import type { SquareStatus } from "App/Types";
import { BOARD_SIZE } from "App/Constants";
import "./App.css";

export function App() {
  const [playing, setPlaying] = useState(false);
  const [deployedShips, setDeployedShips] = useState<Ship[]>([]);
  const [targets, setTargets] = useState<number[]>([]);

  const squares: SquareStatus[] = Array(BOARD_SIZE).fill(null);
  const deployedShipCoordinates = deployedShips
    .map((ship) => ship.coordinates)
    .flat();

  for (const coordinate of deployedShipCoordinates) {
    squares[coordinate] = "occupiedByDeployedShip";
  }

  for (const coordinate of targets) {
    if (squares[coordinate] === "occupiedByDeployedShip") {
      squares[coordinate] = "hit";
      continue;
    }
    squares[coordinate] = "miss";
  }

  return playing ? (
    <div className="flex">
      {/* Player's targeting board */}
      <GameBoard
        playable={true}
        squares={squares.map((status) =>
          status === "occupiedByDeployedShip" ? null : status
        )}
        onSquareClick={(index: number) => {
          const square = squares[index];
          if (square === "hit" || square === "miss") {
            console.log("square has already been targeted");
            return;
          }
          setTargets([...targets, index]);
        }}
      />
      {/* Player's fleet */}
      <GameBoard
        playable={false}
        squares={squares}
        onSquareClick={() => undefined}
      />
    </div>
  ) : (
    <GameSetup
      deployedShips={deployedShips}
      setDeployedShips={setDeployedShips}
      onGameStart={() => setPlaying(true)}
    />
  );
}
