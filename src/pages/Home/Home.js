import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div className="game-modes">
        <Link to="/game/single" className="blue-button">
          Single Player
        </Link>
        <Link to="/game/offline" className="blue-button">
          Offline Multiplayer
        </Link>
        <Link to="/game/anonymous" className="blue-button">
          Anonymous Multiplayer
        </Link>
        <Link to="/game/online" className="blue-button">
          Online Multiplayer
        </Link>
      </div>
    </>
  );
};
