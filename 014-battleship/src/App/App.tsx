import { useState, useEffect } from "react";
import { GameBoard, GameSetup, FleetStatus } from "App/Components";
import { Ship } from "App/Classes";
import { BOARD_SIZE } from "App/Constants";
import { createRandomShipDeployment, computeTargetSquare } from "App/Utilities";
import type { Player } from "App/Interfaces";
import type { SquareStatus } from "App/Types";
import "./App.css";

export function App() {
  const [turn, setTurn] = useState<"player" | "computer">("player");
  const [playing, setPlaying] = useState(false);

  const [deployedShips, setDeployedShips] = useState<Ship[]>([]);
  const [computerDeployedShips] = useState<Ship[]>(
    createRandomShipDeployment()
  );

  const [playerTargets, setPlayerTargets] = useState<number[]>([]);
  const [computerTargets, setComputerTargets] = useState<number[]>([]);

  const player: Player = {
    squares: populateSquares(deployedShips, computerTargets),
    deployedShips: deployedShips,
  };

  const computer: Player = {
    squares: populateSquares(computerDeployedShips, playerTargets),
    deployedShips: computerDeployedShips,
  };

  // computer: choose target
  useEffect(() => {
    if (turn !== "computer") return;

    setTimeout(() => {
      const squares = player.squares.map((status) =>
        status === "occupiedByDeployedShip" ? null : status
      );
      const target = computeTargetSquare(squares);

      setComputerTargets([...computerTargets, target]);
      setTurn("player");
    }, 200);
  }, [turn]);

  const winner = checkForWinner(player, computer);

  return playing ? (
    <div className="flex-column">
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
            setPlayerTargets([...playerTargets, index]);
            setTurn("computer");
          }}
        />
        {/* Player's fleet */}
        <GameBoard
          playable={false}
          squares={player.squares}
          onSquareClick={() => undefined}
        />
        <FleetStatus player={player} />
      </div>
      {winner && (
        <h1 className="winner">
          {winner === "player" ? "You won!" : "You lost!"}
        </h1>
      )}
    </div>
  ) : (
    <GameSetup
      deployedShips={deployedShips}
      setDeployedShips={setDeployedShips}
      onGameStart={() => setPlaying(true)}
    />
  );
}

function checkForWinner(player: Player, computer: Player) {
  const playerHasShips = player.squares.includes("occupiedByDeployedShip");
  const computerHasShips = computer.squares.includes("occupiedByDeployedShip");

  if (!playerHasShips) return "computer";
  if (!computerHasShips) return "player";
  return null;
}

function populateSquares(ships: Ship[], targets: number[]) {
  const squares: SquareStatus[] = Array(BOARD_SIZE).fill(null);

  for (const ship of ships) {
    for (const coord of ship.coordinates) {
      squares[coord] = "occupiedByDeployedShip";
    }
  }

  for (const target of targets) {
    if (squares[target] === "occupiedByDeployedShip") {
      squares[target] = "hit";
      continue;
    }
    squares[target] = "miss";
  }

  return squares;
}
