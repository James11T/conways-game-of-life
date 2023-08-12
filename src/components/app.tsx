import React from "react";
import {
  Grid,
  Vector,
  cloneGrid,
  generateGrid,
  stepGrid,
  CellState,
} from "../gol";
import useMouseDown from "../hooks/useMouseDown";
import useInterval from "../hooks/useInterval";
import Cell from "./cell";

const DEFAULT_INTERVAL = 200;
const DEFAULT_GRID = generateGrid(85, 40);

const App = () => {
  const [grid, setGrid] = React.useState<Grid>(DEFAULT_GRID);
  const [paused, setPaused] = React.useState(false);
  const [mode, setMode] = React.useState<"DRAW" | "ERASE">("DRAW");
  const [interval, setInterval] = React.useState(DEFAULT_INTERVAL);
  const mouseDown = useMouseDown();

  const onTick = React.useCallback(() => {
    if (paused) return;
    setGrid((old) => stepGrid(old));
  }, [paused]);

  useInterval(onTick, interval);

  const toggleCell = ([y, x]: Vector, alive?: CellState) => {
    const newGrid = cloneGrid(grid);
    newGrid[y][x] = alive ?? !newGrid[y][x];
    setGrid(newGrid);
  };

  const handleMouseEnterCell = (vector: Vector) => {
    if (!mouseDown) return;
    toggleCell(vector, mode === "DRAW");
  };

  return (
    <>
      <div>
        {grid.map((row, y) => (
          <div className="cell-row" key={`row-${y}`}>
            {row.map((cell, x) => (
              <Cell
                alive={cell}
                onMouseEnter={() => handleMouseEnterCell([y, x])}
                onClick={() => toggleCell([y, x])}
                key={`cell-${y}-${x}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls-row">
        <button onClick={() => setPaused((old) => !old)}>
          {paused ? "Play" : "Pause"}
        </button>
        <button
          onClick={() => setMode((old) => (old === "DRAW" ? "ERASE" : "DRAW"))}
        >
          {mode === "DRAW" ? "Erase" : "Draw"}
        </button>
        <button onClick={() => setGrid(DEFAULT_GRID)}>Reset</button>
        <input
          type="range"
          name="interval"
          id="interval"
          max={1000}
          min={50}
          step={5}
          value={interval}
          onChange={(event) => setInterval(event.currentTarget.valueAsNumber)}
        />
        {interval}ms
      </div>
    </>
  );
};

export default App;
