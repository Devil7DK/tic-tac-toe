import "./SinglePlayer.scss";

import { useEffect, useState } from "react";

import { GameGrid, showResult } from "../../../components";
import { getNextMove, getResult } from "../../../utils";

const playerTurn = "X";

export const SinglePlayer = () => {
  // State to keep track of the current player
  const [turn, setTurn] = useState("X");

  // Set up the state for the values of 3x3 grid as an array of 9 with empty strings as default values
  const [values, setValues] = useState(() => new Array(9).fill(""));

  // State to keep track of the computer thinking
  const [thinking, setThinking] = useState(false);

  const onGridClick = (index) => {
    if (turn === playerTurn && !values[index]) {
      setValues((oldValues) =>
        oldValues.map((value, valueIndex) =>
          index === valueIndex ? turn : value
        )
      );

      setTurn((oldTurn) => (oldTurn === "X" ? "O" : "X"));

      setThinking(true);
      setTimeout(() => {
        setValues((oldValues) => {
          const nextIndex = getNextMove(oldValues, playerTurn, index);
          return oldValues.map((value, valueIndex) =>
            nextIndex === valueIndex ? (playerTurn === "X" ? "O" : "X") : value
          );
        });

        setTurn((oldTurn) => (oldTurn === "X" ? "O" : "X"));
        setThinking(false);
      }, 500);
    }
  };

  useEffect(() => {
    const result = getResult(values);

    if (result.winner || result.isDraw) {
      showResult(result);
    }
  }, [values]);

  return (
    <div className="game-container single-multiplayer">
      <h2>Current Player: {turn}</h2>

      <div className="game-grid-container">
        <GameGrid values={values} onClick={onGridClick} />
        {thinking && <div className="game-grid-overlay">Thinking...</div>}
      </div>
    </div>
  );
};
