type Player = "X" | "O";
type Square = Player | null;

export class TicTacToe {
  #board: Square[] = Array(9).fill(null);
  #currentPlayer: Player = "X";
  #gameOver = false;

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
      }
    }

    if (!this.#board.includes(null)) {
      console.log("Result: draw");
      this.#gameOver = true;
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
}
