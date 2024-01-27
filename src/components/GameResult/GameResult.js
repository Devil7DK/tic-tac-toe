import "./GameResult.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameGrid } from "../GameGrid/GameGrid";

export const showResult = (result) => {
  document.dispatchEvent(
    new CustomEvent("showResult", {
      detail: result,
    })
  );
};

export const GameResult = () => {
  const [result, setResult] = useState(null);

  const onClick = () => {
    setResult(null);
  };

  useEffect(() => {
    const onShowResult = (event) => {
      setResult(event.detail);
    };

    document.addEventListener("showResult", onShowResult);

    return () => {
      document.removeEventListener("showResult", onShowResult);
    };
  }, []);

  return (
    result && (
      <div className="game-result">
        <div className="result-container">
          {result.isDraw ? (
            <div className="game-result-text">It's a draw!</div>
          ) : (
            <div className="game-result-text">{result.winner} won!</div>
          )}

          <GameGrid
            values={result.values}
            lineIndices={result.winningCombination}
          />

          <Link to="/" className="blue-button" onClick={onClick}>
            Play Again
          </Link>
        </div>
      </div>
    )
  );
};
