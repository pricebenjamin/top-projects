import { useState } from "react";
import { GameBoard } from "App/Components";
import { Ship } from "App/Classes";
import type { ShipClass, SquareStatus } from "App/Types";
import { AwaitingDeployment, ShipMovementControls } from "./Components";
import "./GameSetup.css";

interface GameSetupProps {
  squares: SquareStatus[];
  deployedShips: Ship[];
  setDeployedShips: (ships: Ship[]) => void;
  onGameStart: () => void;
}

export function GameSetup({
  squares,
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

  const shipCoordinates = deployedShips.map((ship) => ship.coordinates).flat();

  function updateActiveShip(ship: Ship) {
    setActiveShip(ship.copy());
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
          activeShip={activeShip ?? undefined}
          shipCoordinates={shipCoordinates}
          onSquareClick={() => undefined}
        />
        {activeShip && (
          <button
            onClick={() => {
              for (const idx of activeShip.coordinates) {
                if (!shipCoordinates.includes(idx)) continue;
                console.log("Cannot deploy ship. Coordinates occupied.");
                return;
              }

              const deployed = [...deployedShips];
              deployed.push(activeShip);
              setDeployedShips(deployed);
              setActiveShip(null);
            }}
          >
            Deploy
          </button>
        )}
        <AwaitingDeployment
          classesToDeploy={classesToDeploy}
          onShipActivate={(cls: ShipClass) => {
            const ship = new Ship(cls, 0, "horizontal");
            setActiveShip(ship);
          }}
        />
        {activeShip && (
          <ShipMovementControls
            ship={activeShip}
            onShipMove={updateActiveShip}
            onShipDelete={() => setActiveShip(null)}
          />
        )}
      </div>
      {classesToDeploy.length === 0 && (
        <button onClick={onGameStart}>Begin Game</button>
      )}
    </>
  );
}
