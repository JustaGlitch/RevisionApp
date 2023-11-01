import React, { useState, useEffect } from 'react';
import { StopWatch, YourReward } from "../../components";


function index() {
  const rewards = ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/172.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png'];
  const [rewardIndex, setRewardIndex] = useState(0);
  const [changePokemon, setChangePokemon] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

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
}, [changePokemon, rewards]);
  const handleStartStop = () => {
      setChangePokemon(!changePokemon);
    };
  return (
    <div className="row h-100">
      <div className="col-sm-12 col-md-6">
        <div className='d-flex col-sm-12 col-md-8 flex-column align-items-center py-4 stopWatch'>
          {/* {!isStopped ? (
            <> */}
            <h1>Task 1</h1>
            <div className='lead px-3'>Task description</div>
        <StopWatch changePokemon={changePokemon} onStartStop={handleStartStop} isStopped={isStopped} setIsStopped={setIsStopped}/>
        {/* </>
        ) : ''} */}
        </div>
      </div>
      <div className='col-sm-12 col-md-6'>
        <YourReward rewards={rewards} rewardIndex={rewardIndex} isStopped={isStopped} />
      </div>
    </div>
  )
}

export default index
