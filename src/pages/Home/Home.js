import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div className="game-modes">
        <Link
          to="/game/single"
          className="blue-button"
          title="Play agains the computer"
        >
          Single Player
        </Link>
        <Link
          to="/game/offline"
          className="blue-button"
          title="Play against a friend on the same device"
        >
          Offline Multiplayer
        </Link>
        <Link
          to="/game/anonymous"
          className="blue-button"
          title="Play against a stranger online"
        >
          Anonymous Multiplayer
        </Link>
        <Link
          to="/game/online"
          className="blue-button"
          title="Play against a friend online by sharing the room code."
        >
          Online Multiplayer
        </Link>
      </div>
    </>
  );
};
