import "./Game.scss";

import { Navigate, Route, Routes } from "react-router-dom";

import { OfflineMultiplayer } from "./OfflineMultiplayer/OfflineMultiplayer";
import { SinglePlayer } from "./SinglePlayer/SinglePlayer";

export const Game = () => {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <Routes>
        <Route path="single" element={<SinglePlayer />} />
        <Route path="offline" element={<OfflineMultiplayer />} />

        <Route path="*" element={<Navigate to="offline" />} />
      </Routes>
    </>
  );
};
