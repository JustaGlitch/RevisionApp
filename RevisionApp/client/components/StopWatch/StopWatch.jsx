import React, { useState, useEffect } from "react";
const StopWatch = ({onStartStop, isStopped, setIsStopped}) => {
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
    onStartStop();
    setIsRunning(!isRunning);

  };
  
  const finish = () => {
    setTime(0);
    setIsRunning(false);
    if (!isStopped) {
      setIsStopped(true);
  }
  };
  return (
    <div className="stopwatch-container text-center mt-5">
      <p className="stopwatch-time">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="btn-group  btn-group-lg stopwatch-buttons" role="group">
        <button className="stopwatch-button btn bg-success-subtle" onClick={startAndStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="stopwatch-button btn bg-info-subtle" onClick={finish}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
