import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StopWatch, YourReward } from "../../components";


function index() {
  const {id} = useParams()
  const rewards = ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/172.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png'];
  const [rewardIndex, setRewardIndex] = useState(0);
  const [changePokemon, setChangePokemon] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [taskDescription, setTaskDescription] = useState('Task description');
  const [title, setTitle] = useState('')
  const [time, setTime] = useState(0)
  useEffect(() => {
    const fetchHero = async () => {
      const resp = await fetch(`https://studydex.onrender.com/tasks/${id}`);
      const data = await resp.json();
      setTitle(data.title)
      setTaskDescription(data.description)
      setTime(data.suggested_time)
      setIsLoading(false);
    };

    fetchHero();
  }, [id]);
  useEffect(() => {
    let intervalId;
    if (changePokemon) {
      intervalId = setInterval(() => {
        setRewardIndex((prevIndex) => {
          if (prevIndex + 1 === rewards.length) {
            setChangePokemon(false);
            return prevIndex;
          }
          return (prevIndex + 1) % rewards.length;
        });
      }, 3000);
    }

  return () => clearInterval(intervalId);
}, [changePokemon]);
  const handleStartStop = () => {
      setChangePokemon(!changePokemon);
    };
  const handleFinish = () => {
      setChangePokemon(false);
    };
  return (
    <div className="row h-100">
      <div className="col-sm-12 col-md-6 h-100">
        <div className='d-flex col-sm-12 col-md-8 flex-column align-items-center py-4 stopWatch h-100'>
           
            <>
              <h1>{isLoading ? 'Loading...' : !isStopped ? title : 'Task Finished!'}</h1>
              {!isStopped ? <p>Suggested time: {time}</p> : ''}
              <div className='lead px-5 text-center'>{!isStopped ? taskDescription: 'Congratulations, you can take a break now'}</div>
            </>
        <StopWatch changePokemon={changePokemon} onStartStop={handleStartStop} isStopped={isStopped} setIsStopped={setIsStopped} stopPokeChange={handleFinish} />
        </div>
      </div>
      <div className='col-sm-12 col-md-6'>
        <YourReward rewards={rewards} rewardIndex={rewardIndex} isStopped={isStopped} />
      </div>
    </div>
  )
}

export default index
