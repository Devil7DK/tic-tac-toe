import { useMemo } from "react";
import { getXYFromIndex } from "../../utils";
import "./GameGrid.scss";

const gap = 5;
const size = 30;
const strokeWidth = 2;

const svgSize = size * 3 + gap * 4;

export const GameGrid = ({ values, lineIndices, onClick }) => {
  const onGridClick = (index) => () => {
    if (typeof onClick === "function") {
      onClick(index);
    }
  };

  const lineCoords = useMemo(() => {
    if (lineIndices && lineIndices.length === 3) {
      const loc1 = getXYFromIndex(lineIndices[0]);
      const loc2 = getXYFromIndex(lineIndices[2]);

      const x1 = (loc1.x + 1) * gap + loc1.x * size + size / 2;
      const y1 = (loc1.y + 1) * gap + loc1.y * size + size / 2;

      const x2 = (loc2.x + 1) * gap + loc2.x * size + size / 2;
      const y2 = (loc2.y + 1) * gap + loc2.y * size + size / 2;

      return { x1, y1, x2, y2 };
    }

    return null;
  }, [lineIndices]);

  return (
    <svg className="game-grid" viewBox={`0 0 ${svgSize} ${svgSize}`}>
      {values.map((value, index) => {
        const loc = getXYFromIndex(index);

        const x = (loc.x + 1) * gap + loc.x * size;
        const y = (loc.y + 1) * gap + loc.y * size;

        const cx = x + size / 2;
        const cy = y + size / 2;

        const symbolSize = size / 4;

        return (
          <g key={index} onClick={onGridClick(index)}>
            <rect
              x={x}
              y={y}
              height={size}
              width={size}
              stroke="black"
              strokeWidth={strokeWidth}
              fill="white"
            />
            {value === "O" ? (
              <circle
                cx={cx}
                cy={cy}
                r={symbolSize}
                stroke="black"
                strokeWidth={strokeWidth}
                fill="white"
              />
            ) : value === "X" ? (
              <path
                d={`M${cx - symbolSize},${cy - symbolSize} L${
                  cx + symbolSize
                },${cy + symbolSize} M${cx - symbolSize},${cy + symbolSize} L${
                  cx + symbolSize
                },${cy - symbolSize}`}
                fill="transparent"
                stroke="black"
                strokeWidth={strokeWidth}
              />
            ) : null}
          </g>
        );
      })}
      {lineCoords && (
        <line
          x1={lineCoords.x1}
          y1={lineCoords.y1}
          x2={lineCoords.x2}
          y2={lineCoords.y2}
          stroke="red"
          strokeWidth={strokeWidth}
          strokeDasharray={`${size / 8} ${size / 16}`}
        />
      )}
    </svg>
  );
};
