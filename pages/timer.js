import React from "react";

const Timer = ({ handleIncrease }) => {
  return (
    <div>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
};

export default Timer;
