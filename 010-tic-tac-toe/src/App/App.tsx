import { useRef, useState } from "react";
import { TicTacToe, TicTacToeBoard } from "@components/TicTacToe";
import { PlayerCard } from "@components/PlayerCard";
import "./App.css";

function App() {
  const game = useRef(new TicTacToe());
  const [board, setBoard] = useState(game.current.getBoard());

  function newGame() {
    game.current = new TicTacToe();
    setBoard(game.current.getBoard());
  }

  function playMove(move: number) {
    game.current.playMove(move);
    setBoard(game.current.getBoard());
  }

  const winner = game.current.getOutcome();

  const header = null;
  const outcomeBanner = null;

  const [xName, xSetName] = useState("Foo");
  const [oName, oSetName] = useState("Bar");

  return (
    <>
      {header}
      <div className="content">
        <PlayerCard
          name={xName}
          setName={xSetName}
          symbol="X"
          alignment="left"
          active={game.current.getPlayer() === "X"}
        />
        <TicTacToeBoard {...{ board, onClick: playMove }} />
        <PlayerCard
          name={oName}
          setName={oSetName}
          symbol="O"
          alignment="right"
          active={game.current.getPlayer() === "O"}
        />
      </div>
      <button onClick={newGame}>New Game</button>
      {winner &&
        (winner === "draw" ? (
          <h1>Draw Game!</h1>
        ) : (
          <h1>Player {winner} wins!</h1>
        ))}
      {outcomeBanner}
    </>
  );
}

export default App;
