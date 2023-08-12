import React from "react";

const useInterval = (handler: () => void, interval: number) => {
  React.useEffect(() => {
    const intervalID = window.setInterval(handler, interval);

    return () => window.clearInterval(intervalID);
  }, [interval, handler]);
};

export default useInterval;
