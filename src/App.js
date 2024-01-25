import "./App.scss";

import { useState } from "react";

import { GameGrid } from "./components";

export const App = () => {
  // Set up the state for the values of 3x3 grid as an array of 9 with empty strings as default values
  const [values, setValues] = useState(() => new Array(9).fill(""));

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <GameGrid values={values} setValues={setValues} />
    </>
  );
};