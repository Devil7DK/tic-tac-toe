import "./GameGrid.scss";

export const GameGrid = ({ values, setValues, turn, setTurn }) => {
  return (
    <div className="game-grid">
      {values.map((value, index) => (
        <div
          key={index}
          className="cell"
          onClick={() => {
            if (value) {
              return;
            }

            setValues((oldValues) =>
              oldValues.map((value, valueIndex) =>
                index === valueIndex ? turn : value
              )
            );

            setTurn((oldTurn) => (oldTurn === "X" ? "O" : "X"));
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};
