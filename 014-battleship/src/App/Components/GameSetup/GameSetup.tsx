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

  const activeShip = deployedShips.at(-1);
  const shipCoordinates = deployedShips.map((ship) => ship.coordinates).flat();

  function updateActiveShip(ship: Ship) {
    const deployed = [...deployedShips];

    // NOTE(ben): activeShip should always have index -1
    deployed.splice(-1, 1, ship);
    setDeployedShips(deployed);
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
          shipCoordinates={shipCoordinates}
          onSquareClick={() => undefined}
        />
        <AwaitingDeployment
          classesToDeploy={classesToDeploy}
          onShipDeploy={(cls: ShipClass) => {
            const ship = new Ship(cls, 0, "horizontal");
            const deployed = [...deployedShips];
            deployed.push(ship);
            setDeployedShips(deployed);
          }}
        />
        {activeShip && (
          <ShipMovementControls
            ship={activeShip}
            onShipMove={updateActiveShip}
            onShipDelete={() => {
              const deployed = [...deployedShips];
              setDeployedShips(
                deployed.filter((ship) => !Object.is(ship, activeShip))
              );
            }}
          />
        )}
      </div>
      {classesToDeploy.length === 0 && (
        <button onClick={onGameStart}>Begin Game</button>
      )}
    </>
  );
}
