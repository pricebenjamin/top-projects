import "./TicTacToe.css";

type Player = "X" | "O";
type Square = Player | null;

interface BoardProps {
  board: Square[];
  onClick: (move: number) => void;
}

export function TicTacToeBoard({ board, onClick }: BoardProps) {
  return (
    <div className="board">
      <div className="row">
        <Square {...{ index: 0, value: board[0], onClick }} />
        <Square {...{ index: 1, value: board[1], onClick }} />
        <Square {...{ index: 2, value: board[2], onClick }} />
      </div>
      <div className="row">
        <Square {...{ index: 3, value: board[3], onClick }} />
        <Square {...{ index: 4, value: board[4], onClick }} />
        <Square {...{ index: 5, value: board[5], onClick }} />
      </div>
      <div className="row">
        <Square {...{ index: 6, value: board[6], onClick }} />
        <Square {...{ index: 7, value: board[7], onClick }} />
        <Square {...{ index: 8, value: board[8], onClick }} />
      </div>
    </div>
  );
}

interface SquareProps {
  index: number;
  value: Square;
  onClick: (value: number) => void;
}

function Square({ index, value, onClick }: SquareProps) {
  return (
    <>
      {value === null ? (
        <div className="square playable" onClick={() => onClick(index)}>
          {index}
        </div>
      ) : (
        <div className="square">{value}</div>
      )}
    </>
  );
}

export class TicTacToe {
  #board: Square[] = Array(9).fill(null);
  #currentPlayer: Player = "X";
  #gameOver = false;
  #outcome: Player | "draw" | undefined = undefined;

  playMove(location: number) {
    if (this.#gameOver) {
      console.log("Cannot play move: game has ended.");
      return;
    }

    if (this.#board[location] !== null) {
      console.log(`Location ${location} has already been played.`);
      return;
    }

    if (this.#board[location] === undefined) {
      console.log(`Invalid location: ${location}`);
      return;
    }

    this.#board[location] = this.#currentPlayer;
    console.log(`${this.#currentPlayer} played: ${location}`);

    this.#switchPlayer();
    this.#checkGameOver();
  }

  #checkGameOver() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const squares = line.map((idx) => this.#board[idx]);
      if (
        squares[0] &&
        squares[0] === squares[1] &&
        squares[0] === squares[2]
      ) {
        console.log(`Winner: ${squares[0]}`);
        this.#gameOver = true;
        this.#outcome = squares[0];
        return;
      }
    }

    if (!this.#board.includes(null)) {
      console.log("Result: draw");
      this.#gameOver = true;
      this.#outcome = "draw";
    }
  }

  #switchPlayer() {
    this.#currentPlayer = this.#currentPlayer === "X" ? "O" : "X";
  }

  showBoard() {
    console.log(`Current player: ${this.#currentPlayer}`);
    console.log([0, 1, 2].map((idx) => this.#board[idx] ?? idx).join(" | "));
    console.log([3, 4, 5].map((idx) => this.#board[idx] ?? idx).join(" | "));
    console.log([6, 7, 8].map((idx) => this.#board[idx] ?? idx).join(" | "));
  }

  getPlayer() {
    return this.#currentPlayer;
  }

  finished() {
    return this.#gameOver;
  }

  getBoard() {
    return [...this.#board];
  }

  getOutcome() {
    return this.#outcome;
  }
}
