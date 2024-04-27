import type { ShipClass } from "App/Types";

interface Props {
  classesToDeploy: ShipClass[];
  onShipActivate: (cls: ShipClass) => void;
}

export function AwaitingDeployment({ classesToDeploy, onShipActivate }: Props) {
  return (
    <div className="flex-column awaiting-deployment">
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
