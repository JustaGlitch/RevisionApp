import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StopWatch, YourReward } from "../../components";
import Preloader from '../../assets/img/preloader3.gif'

function index() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [reward, setReward] = useState(Preloader);
  const [changePokemon, setChangePokemon] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [taskFinished, setTaskFinished] = useState(false)
  const [taskDescription, setTaskDescription] = useState("Task description");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
 
  const fetchPokemon = async () => {
    const resp = await fetch(`https://studydex.onrender.com/tasks/${id}`);
    const data = await resp.json();
    setTitle(data.title);
    setTaskDescription(data.description);
    setTime(data.suggested_time);
    setIsLoading(false);
  };

  const currentPokemon = async () => {
    const resp = await fetch(`https://studydex.onrender.com/student/pokemon/current`, {headers: {Authorization: token}});
    const data = await resp.json();
    console.log(data)
    setReward(data.threed_url)
  }
  const evolvePokemon = async () => {
    const resp = await fetch(`https://studydex.onrender.com/student/pokemon/evolve`, {headers: {Authorization: token}, method: 'POST', studyTime: time});
    const data = await resp.json();
    console.log(data)
    return data;
  }
  const newPokemon = async () => {
    const resp = await fetch(`https://studydex.onrender.com/student/pokemon/new`, {headers: {Authorization: token}, method: 'POST'});
    const data = await resp.json();
    return data;
  }

    useEffect(() => {
        currentPokemon();
        fetchPokemon();
        // evolvePokemon()
        // newPokemon()
    }, []);

  const handleStartStop = () => {
    setChangePokemon(!changePokemon);
  };

  const handleFinish = async () => {
    setChangePokemon(false);
    setIsStopped(true);

    // Get the token from local storage
    if (token) {
      try {
        const response = await fetch(
          `https://studydex.onrender.com/tasks/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ completed: true }),
          }
        );

        if (!response.ok) {
          throw new Error("Task completion failed");
        }

        const data = await response.json();
        console.log("Task completed:", data);
      } catch (error) {
        console.error("Error finishing task:", error);
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTimer(timer + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);


    const finish = () => {
    setTimer(0);
    setIsRunning(false);
    if (!isStopped) {
      setIsStopped(true);
    }
    if(Math.floor(timer/100) > time) {
      setTaskFinished(true)
    } 

  };
  return (
    <div className="row h-100">
      <div className="col-sm-12 col-md-6 h-100">
        <div className="d-flex col-sm-12 col-md-8 flex-column align-items-center py-4 stopWatch h-100">
          <>
            <h1>
              {isLoading ? "Loading..." : !isStopped ? title : "Task Finished!"}
            </h1>
            {!isStopped ? <p>Suggested time: {time} min.</p> : ""}
            <div className="lead px-3 text-center">
              {!isStopped
                ? taskDescription
                : "Congratulations, you can take a break now"}
            </div>
          </>
          <StopWatch
            changePokemon={changePokemon}
            onStartStop={handleStartStop}
            isStopped={isStopped}
            setIsStopped={setIsStopped}
            stopPokeChange={handleFinish}
            handleFinish={handleFinish}
            timer={timer}
            setTimer={setTimer}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            finish={finish}
          />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 mt-3">
        <YourReward
          reward={reward}
          isStopped={isStopped}
          taskFinished={taskFinished}
          time={time}
          timer={timer}
        />
      </div>
    </div>
  );
}

export default index;
