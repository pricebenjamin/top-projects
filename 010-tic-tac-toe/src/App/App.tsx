import { useRef, useState } from "react";
import { TicTacToe, TicTacToeBoard } from "@components/TicTacToe";
import "./App.css";

function App() {
  const game = useRef(new TicTacToe());
  const [board, setBoard] = useState(game.current.getBoard());

  const newGame = () => {
    game.current = new TicTacToe();
    setBoard(game.current.getBoard());
  };

  const playMove = (move: number) => {
    game.current.playMove(move);
    setBoard(game.current.getBoard());
  };

  const winner = game.current.getOutcome();

  return (
    <>
      <TicTacToeBoard {...{ board, onClick: playMove }} />
      <button onClick={newGame}>New Game</button>
      {winner &&
        (winner === "draw" ? (
          <h1>Draw Game!</h1>
        ) : (
          <h1>Player {winner} wins!</h1>
        ))}
    </>
  );
}

export default App;
