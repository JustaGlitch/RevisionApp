import React, { useState, useEffect } from "react";
const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };
  
  const reset = () => {
    setTime(0);
  };
  return (
    <div className="stopwatch-container text-center mt-5">
      <p className="stopwatch-time">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div class="btn-group  btn-group-lg stopwatch-buttons" role="group">
        <button className="stopwatch-button btn bg-success-subtle" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button btn bg-info-subtle" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
