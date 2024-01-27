import { Navigate, Route, Routes } from "react-router-dom";

import { Game } from "./Game/Game";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/game/*" element={<Game />} />
      <Route path="*" element={<Navigate to="/game" />} />
    </Routes>
  );
};
