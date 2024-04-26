import { Ship } from "App/Classes";

interface Props {
  ship: Ship;
  onShipMove: (ship: Ship) => void;
  onShipDelete: () => void;
}

export function ShipMovementControls({
  ship,
  onShipMove,
  onShipDelete,
}: Props) {
  return (
    <div className="flex-column controls">
      <button onClick={() => onShipMove(ship.rotate())}>Rotate</button>
      <button onClick={() => onShipMove(ship.move("up"))}>Move Up</button>
      <button onClick={() => onShipMove(ship.move("down"))}>Move Down</button>
      <button onClick={() => onShipMove(ship.move("left"))}>Move Left</button>
      <button onClick={() => onShipMove(ship.move("right"))}>Move Right</button>
      <button onClick={onShipDelete}>Delete</button>
    </div>
  );
}
