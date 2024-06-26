import { useState } from "react";
import { GameBoard } from "App/Components";
import { Ship } from "App/Classes";
import type { ShipClass, SquareStatus } from "App/Types";
import { DeploymentStatus, ShipMovementControls } from "./Components";
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
  const [activeShip, setActiveShip] = useState<Ship | undefined>();

  const shipClasses: ShipClass[] = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];

  const classesToDeploy = shipClasses.filter(
    (cls) => !deployedShips.some((ship) => ship.class === cls)
  );

  const squares: SquareStatus[] = Array(BOARD_SIZE).fill(null);
  const deployedShipCoordinates = deployedShips
    .map((ship) => ship.coordinates)
    .flat();

  for (const coordinate of deployedShipCoordinates) {
    squares[coordinate] = "occupiedByDeployedShip";
  }

  let ableToDeploy = !!activeShip;

  if (activeShip) {
    for (const coordinate of activeShip.coordinates) {
      if (squares[coordinate] === "occupiedByDeployedShip") {
        squares[coordinate] = "invalid";
        ableToDeploy = false;
        continue;
      }
      squares[coordinate] = "occupiedByActiveShip";
    }
  }

  return (
    <>
      <div className="game-setup">
        <div className="flex-column">
          <button
            className="random-deploy"
            onClick={() => {
              setDeployedShips(createRandomShipDeployment());
              setActiveShip(undefined);
            }}
          >
            Random Deployment
          </button>
          <DeploymentStatus
            activeShip={activeShip}
            deployedShips={deployedShips}
            classesToDeploy={classesToDeploy}
            onShipActivate={(cls: ShipClass) => {
              setActiveShip(new Ship(cls, 0, "horizontal"));
            }}
            onSelectDeployedShip={(ship: Ship) => {
              const deployed = [...deployedShips];
              if (activeShip) deployed.push(activeShip);
              setDeployedShips(deployed.filter((s) => !Object.is(s, ship)));
              setActiveShip(ship);
            }}
          />
        </div>
        <GameBoard
          playable={false}
          setupMode={true}
          squares={squares}
          onSquareClick={(index: number) => {
            if (activeShip?.coordinates.includes(index)) return;

            for (const ship of deployedShips) {
              if (!ship.coordinates.includes(index)) continue;

              const deployed = [...deployedShips];
              if (activeShip) deployed.push(activeShip);

              setDeployedShips(deployed.filter((s) => !Object.is(s, ship)));
              setActiveShip(ship);
              return;
            }
          }}
        />
        <ShipMovementControls
          ship={activeShip}
          ableToDeploy={ableToDeploy}
          ableToStartGame={classesToDeploy.length === 0}
          onShipMove={(ship) => setActiveShip(ship.copy())}
          onShipDelete={() => setActiveShip(undefined)}
          onShipDeploy={() => {
            if (!activeShip) return;
            const deployed = [...deployedShips, activeShip];
            setDeployedShips(deployed);

            const leftToDeploy = shipClasses.filter(
              (cls) => !deployed.some((ship) => ship.class === cls)
            );

            leftToDeploy.length > 0
              ? setActiveShip(new Ship(leftToDeploy[0], 0, "horizontal"))
              : setActiveShip(undefined);
          }}
          onGameStart={onGameStart}
        />
      </div>
    </>
  );
}
