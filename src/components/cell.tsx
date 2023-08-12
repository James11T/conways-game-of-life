import clsx from "clsx";
import { CellState } from "../game";

interface CellProps extends React.ComponentPropsWithoutRef<"div"> {
  alive: CellState;
}

const Cell = ({ alive, className, ...divProps }: CellProps) => {
  return (
    <div
      className={clsx(
        {
          cell: true,
          "cell--alive": alive,
        },
        className
      )}
      {...divProps}
    ></div>
  );
};

export default Cell;
