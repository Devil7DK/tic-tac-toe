import "./GameGrid.scss";

export const GameGrid = ({ values, setValues }) => {
  return (
    <div className="game-grid">
      {values.map((value, index) => (
        <div
          key={index}
          className="cell"
          onClick={() => {
            setValues((oldValues) =>
              oldValues.map((value, valueIndex) =>
                index === valueIndex ? "X" : value
              )
            );
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};
