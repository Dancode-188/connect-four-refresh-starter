const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move', this.makeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }


  makeMove() {
    let row = this.cursor.row;
    let col = this.cursor.col;

    if (this.grid[row][col] === " ") {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);

      let winner = ConnectFour.checkWin(this.grid);
      if (winner) {
        TTT.endGame(winner);
      } else {
        this.playerTurn = this.playerTurn === "O" ? "X" : "O";
        Screen.setMessage(`It's ${this.playerTurn}'s turn`);
      }
    }
    Screen.render();
  }

  static checkWin(grid) {
    // Check rows
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length - 3; col++) {
        if (grid[row][col] !== " " &&
            grid[row][col] === grid[row][col + 1] &&
            grid[row][col] === grid[row][col + 2] &&
            grid[row][col] === grid[row][col + 3]) {
          return grid[row][col];
        }
      }
    }

    // Check columns
    for (let col = 0; col < grid[0].length; col++) {
      for (let row = 0; row < grid.length - 3; row++) {
        if (grid[row][col] !== " " &&
            grid[row][col] === grid[row + 1][col] &&
            grid[row][col] === grid[row + 2][col] &&
            grid[row][col] === grid[row + 3][col]) {
          return grid[row][col];
        }
      }
    }

    // Check diagonals
    for (let row = 0; row < grid.length - 3; row++) {
      for (let col = 0; col < grid[row].length - 3; col++) {
        if (grid[row][col] !== " " &&
            grid[row][col] === grid[row + 1][col + 1] &&
            grid[row][col] === grid[row + 2][col + 2] &&
            grid[row][col] === grid[row + 3][col + 3]) {
          return grid[row][col];
        }
      }
    }

    for (let row = 0; row < grid.length - 3; row++) {
      for (let col = 3; col < grid[row].length; col++) {
        if (grid[row][col] !== " " &&
            grid[row][col] === grid[row + 1][col - 1] &&
            grid[row][col] === grid[row + 2][col - 2] &&
            grid[row][col] === grid[row + 3][col - 3]) {
          return grid[row][col];
        }
      }
    }

    // Check for tie
    if (grid.every((row) => row.every((cell) => cell !== " "))) {
      return "T";
    }
    return false;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
