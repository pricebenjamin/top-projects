import { Ship } from "App/Classes";
import "./ShipMovementControls.css";

interface Props {
  ship?: Ship;
  ableToDeploy: boolean;
  ableToStartGame: boolean;
  onShipMove: (ship: Ship) => void;
  onShipDelete: () => void;
  onShipDeploy: () => void;
  onGameStart: () => void;
}

export function ShipMovementControls({
  ship,
  ableToDeploy,
  ableToStartGame,
  onShipMove,
  onShipDelete,
  onShipDeploy,
  onGameStart,
}: Props) {
  return (
    <div className="controls">
      <button className="delete" onClick={onShipDelete} disabled={!ship}>
        Delete
      </button>
      <div className="arrows">
        <button
          className="rotate"
          onClick={() => onShipMove(ship!.rotate())}
          disabled={!ship}
        >
          ↻
        </button>
        <button
          className="move-up"
          onClick={() => onShipMove(ship!.move("up"))}
          disabled={!ship}
        >
          △
        </button>
        <button
          className="move-down"
          onClick={() => onShipMove(ship!.move("down"))}
          disabled={!ship}
        >
          ▽
        </button>
        <button
          className="move-left"
          onClick={() => onShipMove(ship!.move("left"))}
          disabled={!ship}
        >
          ◁
        </button>
        <button
          className="move-right"
          onClick={() => onShipMove(ship!.move("right"))}
          disabled={!ship}
        >
          ▷
        </button>
      </div>
      <button
        className="random"
        onClick={() => {
          onShipMove(Ship.random(ship!.class));
        }}
        disabled={!ship}
      >
        Random
      </button>
      <button
        className="deploy"
        onClick={onShipDeploy}
        disabled={!ship || !ableToDeploy}
      >
        Deploy
      </button>
      <button
        className="start"
        onClick={onGameStart}
        disabled={!ableToStartGame}
      >
        Start
      </button>
    </div>
  );
}
