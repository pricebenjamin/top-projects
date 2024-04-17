import "./TicTacToe.css";

type Player = "X" | "O";
type Square = Player | null;

interface BoardProps {
  board: Square[];
  onClick: (move: number) => void;
  winLine: number[] | undefined;
}

export function TicTacToeBoard({ board, onClick, winLine }: BoardProps) {
  function createSquare(index: number) {
    return (
      <Square
        {...{
          index,
          value: board[index],
          onClick,
          highlight: winLine === undefined ? false : winLine.includes(index),
        }}
      />
    );
  }
  return (
    <div className="board">
      <div className="row">
        {createSquare(0)}
        {createSquare(1)}
        {createSquare(2)}
      </div>
      <div className="row">
        {createSquare(3)}
        {createSquare(4)}
        {createSquare(5)}
      </div>
      <div className="row">
        {createSquare(6)}
        {createSquare(7)}
        {createSquare(8)}
      </div>
    </div>
  );
}

interface SquareProps {
  index: number;
  value: Square;
  onClick: (value: number) => void;
  highlight: boolean;
}

function Square({ index, value, onClick, highlight = false }: SquareProps) {
  return value === null ? (
    <div className={"square playable"} onClick={() => onClick(index)}>
      {index}
    </div>
  ) : (
    <div className={`square ${highlight ? "highlight" : ""}`}>{value}</div>
  );
}

export class TicTacToe {
  #board: Square[] = Array(9).fill(null);
  #currentPlayer: Player = "X";
  #gameOver = false;
  #outcome: Player | "draw" | undefined = undefined;
  #winLine: number[] | undefined = undefined;

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
        this.#winLine = [...line];
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

  getWinLine() {
    return this.#winLine;
  }
}
