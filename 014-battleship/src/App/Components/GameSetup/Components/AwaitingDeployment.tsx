import type { ShipClass } from "App/Types";

interface Props {
  classesToDeploy: ShipClass[];
  onShipDeploy: (cls: ShipClass) => void;
}

export function AwaitingDeployment({ classesToDeploy, onShipDeploy }: Props) {
  return (
    <div className="flex-column awaiting-deployment">
      {classesToDeploy.map((shipClass) => (
        <button
          key={shipClass}
          onClick={() => {
            onShipDeploy(shipClass);
          }}
        >
          {shipClass}
        </button>
      ))}
    </div>
  );
}
