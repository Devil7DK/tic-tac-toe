import "./Game.scss";

import { Navigate, Route, Routes } from "react-router-dom";
import { OfflineMultiplayer } from "./OfflineMultiplayer/OfflineMultiplayer";

export const Game = () => {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <Routes>
        <Route path="offline" element={<OfflineMultiplayer />} />

        <Route path="*" element={<Navigate to="offline" />} />
      </Routes>
    </>
  );
};
