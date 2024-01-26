import "./App.scss";

import { useEffect, useState } from "react";

import { GameGrid } from "./components";

const WinningCombinations = [
  /**
   * [X, X, X]
   * [?, ?, ?]
   * [?, ?, ?]
   */
  [0, 1, 2],
  /**
   * [?, ?, ?]
   * [X, X, X]
   * [?, ?, ?]
   */
  [3, 4, 5],
  /**
   * [?, ?, ?]
   * [?, ?, ?]
   * [X, X, X]
   */
  [6, 7, 8],
  /**
   * [X, ?, ?]
   * [X, ?, ?]
   * [X, ?, ?]
   */
  [0, 3, 6],
  /**
   * [?, X, ?]
   * [?, X, ?]
   * [?, X, ?]
   */
  [1, 4, 7],
  /**
   * [?, ?, X]
   * [?, ?, X]
   * [?, ?, X]
   */
  [2, 5, 8],
  /**
   * [X, ?, ?]
   * [?, X, ?]
   * [?, ?, X]
   */
  [0, 4, 8],
  /**
   * [?, ?, X]
   * [?, X, ?]
   * [X, ?, ?]
   */
  [2, 4, 6],
];

export const App = () => {
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
    const winner = ["X", "O"].find((player) => {
      return WinningCombinations.find((combination) => {
        return combination.every((index) => values[index] === player);
      });
    });

    if (winner) {
      alert(`${winner} won!`);
      setValues(new Array(9).fill(""));
      return;
    }

    const isDraw = values.every((value) => value !== "");

    if (isDraw) {
      alert("Draw!");
      setValues(new Array(9).fill(""));
    }
  }, [values]);

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <h2>Current Player: {turn}</h2>

      <GameGrid values={values} onClick={onGridClick} />
    </>
  );
};
