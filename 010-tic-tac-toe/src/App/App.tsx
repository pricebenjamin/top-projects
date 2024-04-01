import { TicTacToe } from "@components/TicTacToe";
import "./App.css";

function App() {
  function play() {
    const game = new TicTacToe();

    while (!game.finished()) {
      console.clear();
      game.showBoard();

      const input = prompt(`Current Player: ${game.getPlayer()}\n\nMove:`);
      if (input === null) break;

      const move = Number(input);
      game.playMove(move);
    }
  }

  return <button onClick={play}>Play Tic Tac Toe</button>;
}

export default App;
