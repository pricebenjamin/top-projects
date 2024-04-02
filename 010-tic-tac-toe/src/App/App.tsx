import { useRef, useState } from "react";
import { TicTacToe, TicTacToeBoard } from "@components/TicTacToe";
import { PlayerCard } from "@components/PlayerCard";
import { Header } from "@components/Header";
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

  const [xName, xSetName] = useState("Player 1");
  const [oName, oSetName] = useState("Player 2");

  return (
    <>
      <Header title="Tic-Tac-Toe" actions={new Map([["New Game", newGame]])} />
      <div className="content">
        <PlayerCard
          symbol="X"
          active={game.current.getPlayer() === "X"}
          name={xName}
          onNameChange={xSetName}
        />
        <TicTacToeBoard {...{ board, onClick: playMove }} />
        <PlayerCard
          symbol="O"
          active={game.current.getPlayer() === "O"}
          name={oName}
          onNameChange={oSetName}
        />
      </div>
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
