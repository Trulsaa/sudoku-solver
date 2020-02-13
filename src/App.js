import React, { useState } from "react";
import "./App.css";

const blankBoard = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "]
];

const gameBoard = [
  [" ", " ", 7, 3, " ", " ", " ", 1, 2],
  [" ", 1, " ", 8, " ", " ", " ", " ", 5],
  [4, " ", " ", 7, 2, " ", 9, " ", " "],
  [" ", " ", 8, " ", " ", 6, 1, " ", " "],
  [" ", " ", " ", " ", " ", 9, 3, " ", " "],
  [2, " ", 6, " ", " ", 3, " ", 7, 8],
  [" ", 5, 3, " ", " ", 8, " ", " ", " "],
  [1, " ", 4, " ", 5, " ", " ", 9, " "],
  [7, " ", " ", 4, " ", " ", 6, " ", 1]
];

const solvedBoard = [
  [8, 6, 7, 3, 9, 5, 4, 1, 2],
  [9, 1, 2, 8, 6, 4, 7, 3, 5],
  [4, 3, 5, 7, 2, 1, 9, 8, 6],
  [3, 4, 8, 5, 7, 6, 1, 2, 9],
  [5, 7, 1, 2, 8, 9, 3, 6, 4],
  [2, 9, 6, 1, 4, 3, 5, 7, 8],
  [6, 5, 3, 9, 1, 8, 2, 4, 7],
  [1, 2, 4, 6, 5, 7, 8, 9, 3],
  [7, 8, 9, 4, 3, 2, 6, 5, 1]
];

console.log("solvedBoard: ", solvedBoard);

function App() {
  return <Board />;
}

export default App;

function Board() {
  const [board, setBoard] = useState(gameBoard);

  const onSquereEdit = (n, x, y) => {
    const newBoard = [...board];
    newBoard[y][x] = n;
    setBoard(newBoard);
  };

  return (
    <div>
      {board.map((row, y) => (
        <div key={y}>
          <Row row={row} y={y} onSquereEdit={onSquereEdit} />
        </div>
      ))}
      <button>Solve</button>
    </div>
  );
}

function Row({ row, y, onSquereEdit }) {
  return row.map((n, x) => (
    <Square key={x} n={n} x={x} y={y} onSquereEdit={onSquereEdit} />
  ));
}

function Square({ n, x, y, onSquereEdit }) {
  return (
    <input
      type="number"
      value={n}
      onChange={({ target }) => {
        onSquereEdit(target.value, x, y);
      }}
    />
  );
}

function solve(board) {
  const solvedBoard = [...board];
  for (let y of board) {
    for (let x of y) {
      if (!solvedBoard[y][x]) {
        const n = getPossibleNumbers(board, x, y);
        if (n.length === 1) {
          solvedBoard[y][x] = n[0];
          if (notFinished(solvedBoard)) {
            solvedBoard = solve(solvedBoard);
          }
        }
      }
    }
  }
  return solvedBoard;
}

function notFinished(board) {
  for (let y of board) {
    for (let x of y) {
      if (!board[y][x]) {
        return true;
      }
    }
  }
  return false;
}

function getPossibleNumbers(board, x, y) {
  let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  possibleNumbers = eliminateUsingRow(board, possibleNumbers, y);
  possibleNumbers = eliminateUsingColumn(board, possibleNumbers, x);
  possibleNumbers = eliminateUsingSquare(board, possibleNumbers, x, y);
  return possibleNumbers;
}

function eliminateUsingRow(board, possibleNumbers, y) {
  let newPossibleNumbers = [...possibleNumbers];
  const row = [...board[y]];
  for (let n of row) {
    const index = newPossibleNumbers.indexOf(n);
    if (index != -1) {
      newPossibleNumbers.splice(index, 1);
    }
  }
  return removeDuplicates(newPossibleNumbers, row);
}

function eliminateUsingColumn(board, possibleNumbers, x) {
  let newPossibleNumbers = [...possibleNumbers];
  const column = board.map((row, y) => row[y][x]);
  return removeDuplicates(newPossibleNumbers, column);
}

function eliminateUsingSquare(board, possibleNumbers) {
  let newPossibleNumbers = [...possibleNumbers];
  const square = 
}

function removeDuplicates(a, b) {
  for (let n of b) {
    const index = a.indexOf(n);
    if (index != -1) {
      a.splice(index, 1);
    }
  }
  return a;
}
