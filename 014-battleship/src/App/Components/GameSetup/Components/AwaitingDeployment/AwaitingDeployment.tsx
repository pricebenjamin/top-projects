import { Ship } from "App/Classes";
import type { ShipClass } from "App/Types";
import "./AwaitingDeployment.css";

interface Props {
  activeShip?: Ship;
  classesToDeploy: ShipClass[];
  onShipActivate: (cls: ShipClass) => void;
}

export function AwaitingDeployment({
  activeShip,
  classesToDeploy,
  onShipActivate,
}: Props) {
  return (
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
  );
}
