import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div className="game-modes">
        <Link to="/game/single">Single Player</Link>
        <Link to="/game/offline">Offline Multiplayer</Link>
        <Link to="/game/anonymous">Anonymous Multiplayer</Link>
        <Link to="/game/online">Online Multiplayer</Link>
      </div>
    </>
  );
};
