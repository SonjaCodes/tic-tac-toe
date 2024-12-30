import { useState } from "react";
import "./index.css";

function Square({ value, onSquareClick, winner }) {
  return (
    <button
      className="square"
      style={{ backgroundColor: winner ? "green" : "white" }}
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          winner={winner && winner === squares[0]}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          winner={winner && winner === squares[1]}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          winner={winner && winner === squares[2]}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          winner={winner && winner === squares[3]}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          winner={winner && winner === squares[4]}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          winner={winner && winner === squares[5]}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          winner={winner && winner === squares[6]}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          winner={winner && winner === squares[7]}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          winner={winner && winner === squares[8]}
        />
      </div>
      <div className="status" style={{ color: winner ? "green" : "black" }}>
        {status}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    if (move > 0) {
      return (
        <li key={move}>
          <span>You are at move #{move}</span>
        </li>
      );
    }
    return null;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>
          {moves}
          <li>
            <button className="reset" onClick={resetGame}>
              Reset game
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
