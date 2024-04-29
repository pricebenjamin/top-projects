import { useState } from "react";
import { GameBoard } from "App/Components";
import { Ship } from "App/Classes";
import type { ShipClass, SquareStatus } from "App/Types";
import { AwaitingDeployment, ShipMovementControls } from "./Components";
import { BOARD_SIZE } from "App/Constants";
import { createRandomShipDeployment } from "App/Utilities";
import "./GameSetup.css";

interface GameSetupProps {
  deployedShips: Ship[];
  setDeployedShips: (ships: Ship[]) => void;
  onGameStart: () => void;
}

export function GameSetup({
  deployedShips,
  setDeployedShips,
  onGameStart,
}: GameSetupProps) {
  const [activeShip, setActiveShip] = useState<Ship | null>(null);

  const shipClasses: ShipClass[] = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];
  const deployedClasses = deployedShips.map((ship) => ship.class);
  const classesToDeploy = shipClasses.filter(
    (cls) => !deployedClasses.includes(cls)
  );

  const squares: SquareStatus[] = Array(BOARD_SIZE).fill(null);
  const deployedShipCoordinates = deployedShips
    .map((ship) => ship.coordinates)
    .flat();

  for (const coordinate of deployedShipCoordinates) {
    squares[coordinate] = "occupiedByDeployedShip";
  }

  let ableToDeploy = true;

  for (const coordinate of activeShip?.coordinates ?? []) {
    if (squares[coordinate] === "occupiedByDeployedShip") {
      squares[coordinate] = "invalid";
      ableToDeploy = false;
      continue;
    }
    squares[coordinate] = "occupiedByActiveShip";
  }

  return (
    <>
      <h1>Setup</h1>
      <h2>
        {activeShip
          ? `Deploying: ${activeShip.class}`
          : "Awaiting ship deployment"}
      </h2>
      <div className="game-setup">
        <GameBoard
          playable={false}
          squares={squares}
          onSquareClick={() => undefined}
        />
        <div className="flex-column">
          <button
            onClick={() => {
              setDeployedShips(createRandomShipDeployment());
            }}
          >
            Random
          </button>
          <AwaitingDeployment
            classesToDeploy={classesToDeploy}
            onShipActivate={(cls: ShipClass) => {
              const ship = new Ship(cls, 0, "horizontal");
              setActiveShip(ship);
            }}
          />
          {activeShip && (
            <button
              disabled={!ableToDeploy}
              onClick={() => {
                setDeployedShips([...deployedShips, activeShip]);
                setActiveShip(null);
              }}
            >
              Deploy
            </button>
          )}
          {activeShip && (
            <ShipMovementControls
              ship={activeShip}
              onShipMove={(ship) => setActiveShip(ship.copy())}
              onShipDelete={() => setActiveShip(null)}
            />
          )}
          {classesToDeploy.length === 0 && (
            <button onClick={onGameStart}>Begin Game</button>
          )}
        </div>
      </div>
    </>
  );
}
