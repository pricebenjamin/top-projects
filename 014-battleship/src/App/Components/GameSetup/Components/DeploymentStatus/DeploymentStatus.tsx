import { Ship } from "App/Classes";
import type { ShipClass } from "App/Types";
import "./DeploymentStatus.css";

interface Props {
  activeShip?: Ship;
  deployedShips: Ship[];
  classesToDeploy: ShipClass[];
  onShipActivate: (cls: ShipClass) => void;
}

export function DeploymentStatus({
  activeShip,
  deployedShips,
  classesToDeploy,
  onShipActivate,
}: Props) {
  return (
    <div className="deployment-status">
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

      {deployedShips.length > 0 && (
        <>
          <h2>Deployed</h2>
          <div className="deployed">
            {deployedShips.map((ship) => (
              <button disabled={true}>{ship.class}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
