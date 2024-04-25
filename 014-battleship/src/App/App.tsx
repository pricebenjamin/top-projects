import { useState } from "react";
import { GameBoard } from "App/Components";
import type { Ship, SquareStatus } from "App/Types";
import "./App.css";

const BOARD_SIZE = 100;

export function App() {
  const [squares, setSquares] = useState<SquareStatus[]>(
    Array(BOARD_SIZE).fill(null)
  );

  const ships: Ship[] = [
    {
      class: "Carrier",
      coordinates: [0, 10, 20, 30, 40],
    },
    {
      class: "Battleship",
      coordinates: [52, 62, 72, 82],
    },
    {
      class: "Destroyer",
      coordinates: [73, 74, 75],
    },
    {
      class: "Submarine",
      coordinates: [38, 48, 58],
    },
    {
      class: "Patrol Boat",
      coordinates: [56, 57],
    },
  ];

  const shipCoordinates = ships.map((ship) => ship.coordinates).flat();

  return (
    <>
      <GameBoard
        playable={true}
        squares={squares}
        onSquareClick={(index: number) => {
          squares[index] = shipCoordinates.includes(index) ? "hit" : "miss";
          setSquares([...squares]);
        }}
      />
      <GameBoard
        playable={false}
        squares={squares}
        shipCoordinates={shipCoordinates}
        onSquareClick={() => undefined}
      />
    </>
  );
}
