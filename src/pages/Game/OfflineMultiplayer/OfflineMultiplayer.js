import "./OfflineMultiplayer.scss";

import { useEffect, useState } from "react";

import { GameGrid } from "../../../components";
import { getWinner, isDraw } from "../../../utils";

export const OfflineMultiplayer = () => {
  // State to keep track of the current player
  const [turn, setTurn] = useState("X");

  // Set up the state for the values of 3x3 grid as an array of 9 with empty strings as default values
  const [values, setValues] = useState(() => new Array(9).fill(""));

  const onGridClick = (index) => {
    const value = values[index];

    if (value) {
      return;
    }

    setValues((oldValues) =>
      oldValues.map((value, valueIndex) =>
        index === valueIndex ? turn : value
      )
    );

    setTurn((oldTurn) => (oldTurn === "X" ? "O" : "X"));
  };

  useEffect(() => {
    const winner = getWinner(values);

    if (winner) {
      alert(`${winner} won!`);
      setValues(new Array(9).fill(""));
      setTurn("X");
      return;
    } else if (isDraw(values)) {
      alert("Draw!");
      setValues(new Array(9).fill(""));
      setTurn("X");
    }
  }, [values]);

  return (
    <div className="game-container offline-multiplayer">
      <h2>Current Player: {turn}</h2>

      <GameGrid values={values} onClick={onGridClick} />
    </div>
  );
};
