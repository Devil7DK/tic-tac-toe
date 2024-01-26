import "./GameGrid.scss";

export const GameGrid = ({ values, onClick }) => {
  return (
    <div className="game-grid">
      {values.map((value, index) => (
        <div
          key={index}
          className="cell"
          onClick={() => {
            if (typeof onClick === "function") {
              onClick(index);
            }
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};
