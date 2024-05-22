import { Ship } from "App/Classes";
import type { ShipClass } from "App/Types";
import "./DeploymentStatus.css";

interface Props {
  activeShip?: Ship;
  deployedShips: Ship[];
  classesToDeploy: ShipClass[];
  onShipActivate: (cls: ShipClass) => void;
  onSelectDeployedShip: (ship: Ship) => void;
}

export function DeploymentStatus({
  activeShip,
  deployedShips,
  classesToDeploy,
  onShipActivate,
  onSelectDeployedShip,
}: Props) {
  return (
    <div className="deployment-status">
      {deployedShips.length > 0 && (
        <>
          <h2>Deployed</h2>
          <div className="deployed">
            {deployedShips.map((ship) => (
              <button
                key={ship.class}
                onClick={() => onSelectDeployedShip(ship)}
              >
                {ship.class}
              </button>
            ))}
          </div>
        </>
      )}
      {classesToDeploy.length > 0 && (
        <>
          <h2>Awaiting Deployment</h2>
          <div className="awaiting-deployment">
            {classesToDeploy.map((shipClass) => (
              <button
                key={shipClass}
                onClick={() => {
                  onShipActivate(shipClass);
                }}
                className={activeShip?.class === shipClass ? "selected" : ""}
              >
                {shipClass}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
