import { useState, useEffect } from "react";
import { usePlayer } from "App/Hooks";
import { GameBoard, GameSetup, FleetStatus } from "App/Components";
import {
  createRandomShipDeployment,
  computeTargetSquare,
  checkForWinner,
} from "App/Utilities";
import "./App.css";

export function App() {
  const [turn, setTurn] = useState<"player" | "computer">("player");
  const [playing, setPlaying] = useState(false);

  const computer = usePlayer(createRandomShipDeployment());
  const player = usePlayer([]);

  // computer: choose target
  useEffect(() => {
    if (turn !== "computer") return;

    const squares = player.squares.map((status) =>
      status === "occupiedByDeployedShip" ? null : status
    );
    const target = computeTargetSquare(squares);

    player.setTargets([...player.targets, target]);
    setTurn("player");
  }, [player, turn]);

  const winner = checkForWinner(player, computer);

  return playing ? (
    <div className="flex-column">
      <div className="flex-wrap centered">
        <div className="flex">
          {/* Player's targeting board */}
          <FleetStatus player={computer} />
          <GameBoard
            playable={winner === null && turn === "player"}
            squares={computer.squares.map((status) =>
              status === "occupiedByDeployedShip" ? null : status
            )}
            onSquareClick={(index: number) => {
              const square = computer.squares[index];
              if (square === "hit" || square === "miss") {
                console.log("square has already been targeted");
                return;
              }
              computer.setTargets([...computer.targets, index]);
              setTurn("computer");
            }}
          />
        </div>
        <div className="flex">
          {/* Player's fleet */}
          <GameBoard
            playable={false}
            squares={player.squares}
            onSquareClick={() => undefined}
          />
          <FleetStatus player={player} />
        </div>
      </div>
      {winner && (
        <h1 className="winner">
          {winner === "player" ? "You won!" : "You lost!"}
        </h1>
      )}
    </div>
  ) : (
    <GameSetup
      deployedShips={player.ships}
      setDeployedShips={player.setShips}
      onGameStart={() => setPlaying(true)}
    />
  );
}
