import "./OfflineMultiplayer.scss";

import { useEffect, useState } from "react";

import { GameGrid, showResult } from "../../../components";
import { getResult } from "../../../utils";

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
    const result = getResult(values);

    if (result.winner || result.isDraw) {
      showResult(result);
    }
  }, [values]);

  return (
    <div className="game-container offline-multiplayer">
      <h2>Current Player: {turn}</h2>

      <GameGrid values={values} onClick={onGridClick} />
    </div>
  );
};
