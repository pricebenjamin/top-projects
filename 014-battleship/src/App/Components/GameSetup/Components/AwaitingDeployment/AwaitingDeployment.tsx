import type { ShipClass } from "App/Types";
import "./AwaitingDeployment.css";

interface Props {
  classesToDeploy: ShipClass[];
  onShipActivate: (cls: ShipClass) => void;
}

export function AwaitingDeployment({ classesToDeploy, onShipActivate }: Props) {
  return (
    <div className="awaiting-deployment">
      {classesToDeploy.map((shipClass) => (
        <button
          key={shipClass}
          onClick={() => {
            onShipActivate(shipClass);
          }}
        >
          {shipClass}
        </button>
      ))}
    </div>
  );
}
