import { GameBoard } from "App/Components";
import { Ship } from "App/Classes";
import type { ShipClass, SquareStatus } from "App/Types";
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
        <div className="ships-to-deploy">
          <h2>Left to Deploy</h2>
          <div className="flex-column">
            {classesToDeploy.length > 0 ? (
              classesToDeploy.map((shipClass) => (
                <button
                  key={shipClass}
                  onClick={() => {
                    const ship = new Ship(shipClass, 0, "horizontal");
                    const deployed = [...deployedShips];
                    deployed.push(ship);
                    setDeployedShips(deployed);
                  }}
                >
                  {shipClass}
                </button>
              ))
            ) : (
              <button onClick={() => onGameStart()}>Play</button>
            )}
          </div>
        </div>
        <div className="controls">
          <h2>Controls</h2>
          <div className="flex-column controls">
            {activeShip && (
              <>
                <button
                  onClick={() => {
                    updateActiveShip(activeShip.rotate());
                  }}
                >
                  Rotate
                </button>
                <button
                  onClick={() => {
                    updateActiveShip(activeShip.move("up"));
                  }}
                >
                  Move Up
                </button>
                <button
                  onClick={() => {
                    updateActiveShip(activeShip.move("down"));
                  }}
                >
                  Move Down
                </button>
                <button
                  onClick={() => {
                    updateActiveShip(activeShip.move("left"));
                  }}
                >
                  Move Left
                </button>
                <button
                  onClick={() => {
                    updateActiveShip(activeShip.move("right"));
                  }}
                >
                  Move Right
                </button>
                <button
                  onClick={() => {
                    const deployed = [...deployedShips].filter(
                      (ship) => !Object.is(ship, activeShip)
                    );
                    setDeployedShips(deployed);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
