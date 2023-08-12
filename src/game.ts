type Cell = boolean;
type Grid = Cell[][];
type Vector = [number, number];

type CellState = true | false;

const CellStateEnum = {
  ALIVE: true,
  DEAD: false,
} as const;

const offsets = [-1, 0, 1] as const;

const countSurroundingCells = (grid: Grid, [y, x]: Vector): number => {
  let count = 0;

  for (const offsetY of offsets) {
    for (const offsetX of offsets) {
      if (offsetY === 0 && offsetX === 0) continue;

      const newX = x + offsetX;
      const newY = y + offsetY;

      if (
        newY >= 0 &&
        newY < grid.length &&
        newX >= 0 &&
        newX < grid[y].length &&
        grid[newY][newX]
      ) {
        count += 1;
      }
    }
  }

  return count;
};

const getNextCellState = (grid: Grid, cell: Vector): Cell => {
  const [y, x] = cell;
  const currentCell = grid[y][x];

  const neighborCount = countSurroundingCells(grid, cell);

  if (currentCell === CellStateEnum.ALIVE) {
    if (neighborCount === 2 || neighborCount === 3) {
      // Life
      return CellStateEnum.ALIVE;
    } else {
      // Death
      return CellStateEnum.DEAD;
    }
  } else {
    if (neighborCount === 3) {
      // Birth
      return CellStateEnum.ALIVE;
    } else {
      // Nothing
      return CellStateEnum.DEAD;
    }
  }
};

const cloneGrid = (grid: Grid): Grid => grid.map((row) => [...row]);

const stepGrid = (grid: Grid): Grid => {
  const newGrid = cloneGrid(grid);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      newGrid[y][x] = getNextCellState(grid, [y, x]);
    }
  }

  return newGrid;
};

const generateGrid = (width: number, height: number): Grid =>
  Array(height)
    .fill(undefined)
    .map(() => Array(width).fill(CellStateEnum.DEAD));

export { stepGrid, cloneGrid, generateGrid };
export type { Grid, Cell, Vector, CellState };
