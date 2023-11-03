import React, { useState, useEffect } from "react";
const StopWatch = ({
  onStartStop,
  isStopped,
  setIsStopped,
  timer,
  setTimer,
  isRunning,
  setIsRunning,
  finish
}) => {




  const minutes = Math.floor((timer % 360000) / 6000);
  const seconds = Math.floor((timer % 6000) / 100);

  const startAndStop = () => {
    onStartStop();
    setIsRunning(!isRunning);
  };


  return (
    <div className="stopwatch-container text-center mt-5">
      {isStopped ? (
        <p className="stopwatch-stopped"></p>
      ) : (
        <>
          <p className="stopwatch-time">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
          <div
            className="btn-group  btn-group-lg stopwatch-buttons"
            role="group"
          >
            <button
              className="stopwatch-button btn bg-success-subtle"
              onClick={startAndStop}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
           
            <button
              className="stopwatch-button btn bg-info-subtle"
              onClick={finish}
            >
              Finish
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StopWatch;
