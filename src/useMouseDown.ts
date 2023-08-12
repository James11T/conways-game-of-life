import React from "react";

const useMouseDown = (): boolean => {
  const [mouseDown, setMouseDown] = React.useState(false);

  React.useEffect(() => {
    const mouseDownHandler = () => setMouseDown(true);
    const mouseUpHandler = () => setMouseDown(false);

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  return mouseDown;
};

export default useMouseDown;
