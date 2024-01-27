import { Navigate, Route, Routes } from "react-router-dom";

import { Game } from "./Game/Game";
import { Home } from "./Home/Home";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/game/*" element={<Game />} />
      <Route path="/" element={<Home />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
