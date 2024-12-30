import { useState, useCallback } from "react";

function Square({ value, onSquareClick, winner, isWinningSquare }) {
  return (
    <button
      className="square"
      style={{
        backgroundColor: winner && "green",

      }}
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const calculateWinner = useCallback((squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [a, b, c];
      }
    }
    return null;
  }, []);

  const winningSquares = calculateWinner(squares);
  const isDraw = !winningSquares && squares.every((square) => square !== null);

  const handleClick = useCallback(
    (i) => {
      if (winningSquares || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    },
    [squares, xIsNext, onPlay, winningSquares]
  );

  return (
    <>
      <div className="board">
        {squares.map((square, i) => {
          if (i % 3 === 0) {
            return (
              <div key={i} className="board-row">
                <Square
                  value={square}
                  onSquareClick={() => handleClick(i)}
                  winner={winningSquares && winningSquares.includes(i)}
                  isWinningSquare={winningSquares && winningSquares.includes(i)}
                />
                <Square
                  value={squares[i + 1]}
                  onSquareClick={() => handleClick(i + 1)}
                  winner={winningSquares && winningSquares.includes(i + 1)}
                  isWinningSquare={
                    winningSquares && winningSquares.includes(i + 1)
                  }
                />
                <Square
                  value={squares[i + 2]}
                  onSquareClick={() => handleClick(i + 2)}
                  winner={winningSquares && winningSquares.includes(i + 2)}
                  isWinningSquare={
                    winningSquares && winningSquares.includes(i + 2)
                  }
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      {!winningSquares && !isDraw && <p>Next move: {xIsNext ? "X" : "O"}</p>}
      {winningSquares && (
        <div className="move">
          <h2>Winner: {squares[winningSquares[0]]}</h2>
          <p>
            Winning squares:{" "}
            {winningSquares.map((square) => (
              <span key={square}>{square + 1} </span>
            ))}
          </p>
        </div>
      )}
      {isDraw && <h2>It's a draw!</h2>}
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
