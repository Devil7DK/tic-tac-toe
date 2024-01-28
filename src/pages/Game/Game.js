import "./Game.scss";

import { Link, Navigate, Route, Routes } from "react-router-dom";

import { AnonymousMultiplayer } from "./AnonymousMultiplayer/AnonymousMultiplayer";
import { OfflineMultiplayer } from "./OfflineMultiplayer/OfflineMultiplayer";
import { SinglePlayer } from "./SinglePlayer/SinglePlayer";

export const Game = () => {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <Routes>
        <Route path="single" element={<SinglePlayer />} />
        <Route path="offline" element={<OfflineMultiplayer />} />
        <Route path="anonymous" element={<AnonymousMultiplayer />} />

        <Route path="*" element={<Navigate to="offline" />} />
      </Routes>

      <Link className="blue-button home" to="/">
        Back to Home
      </Link>
    </>
  );
};
