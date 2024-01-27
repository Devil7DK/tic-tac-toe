import "./GameResult.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameGrid } from "../GameGrid/GameGrid";

export const showResult = (values, winner, isDraw) => {
  document.dispatchEvent(
    new CustomEvent("showResult", {
      detail: {
        values,
        winner,
        isDraw,
      },
    })
  );
};

export const GameResult = () => {
  const [values, setValues] = useState(() => new Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const onShowResult = (event) => {
      const { values, winner, isDraw } = event.detail;

      setValues(values);
      setWinner(winner);
      setIsDraw(isDraw);
      setIsOpen(true);
    };

    document.addEventListener("showResult", onShowResult);

    return () => {
      document.removeEventListener("showResult", onShowResult);
    };
  }, []);

  return (
    isOpen && (
      <div className="game-result">
        <div className="result-container">
          {isDraw ? (
            <div className="game-result-text">It's a draw!</div>
          ) : (
            <div className="game-result-text">{winner} won!</div>
          )}

          <GameGrid values={values} />

          <Link to="/" className="blue-button" onClick={onClick}>
            Play Again
          </Link>
        </div>
      </div>
    )
  );
};
