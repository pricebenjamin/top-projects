import { useState, useEffect } from "react";
import { GameBoard, GameSetup, FleetStatus } from "App/Components";
import { Ship } from "App/Classes";
import { BOARD_SIZE } from "App/Constants";
import { createRandomShipDeployment, computeTargetSquare } from "App/Utilities";
import type { Player } from "App/Interfaces";
import "./App.css";

export function App() {
  const [playing, setPlaying] = useState(false);

  const [turn, setTurn] = useState<"player" | "computer">("player");

  const [deployedShips, setDeployedShips] = useState<Ship[]>([]);
  const [computerDeployedShips, setComputerDeployedShips] = useState<Ship[]>(
    []
  );

  const [playerTargets, setPlayerTargets] = useState<number[]>([]);
  const [computerTargets, setComputerTargets] = useState<number[]>([]);

  const player: Player = {
    squares: Array(BOARD_SIZE).fill(null),
    deployedShips: deployedShips,
  };

  const computer: Player = {
    squares: Array(BOARD_SIZE).fill(null),
    deployedShips: computerDeployedShips,
  };

  for (const p of [player, computer]) {
    for (const ship of p.deployedShips) {
      for (const coord of ship.coordinates) {
        p.squares[coord] = "occupiedByDeployedShip";
      }
    }
  }

  // player targets
  for (const coord of playerTargets) {
    if (computer.squares[coord] === "occupiedByDeployedShip") {
      computer.squares[coord] = "hit";
      continue;
    }
    computer.squares[coord] = "miss";
  }

  // computer targets
  for (const coord of computerTargets) {
    if (player.squares[coord] === "occupiedByDeployedShip") {
      player.squares[coord] = "hit";
      continue;
    }
    player.squares[coord] = "miss";
  }

  // computer: compute initial ship deployment
  useEffect(() => {
    setComputerDeployedShips(createRandomShipDeployment());
  }, []);

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
      {winner && <h1>{winner} Wins!</h1>}
      <div className="flex">
        {/* Player's targeting board */}
        <FleetStatus player={computer} />
        <GameBoard
          playable={turn === "player"}
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
