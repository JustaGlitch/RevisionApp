import React, {useEffect, useState} from 'react'

function YourReward({rewards, rewardIndex, isStopped }) {
const [hideClosedPokeball, setHideClosedPokeball] = useState(false);
  useEffect(() => {
    if (isStopped) {
      const timer = setTimeout(() => {
        setHideClosedPokeball(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isStopped]);
  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100'>
    <h2>Your Reward</h2>
    <div className={`d-flex flex-column align-items-center justify-content-center h-100 w-100 ${isStopped ? hideClosedPokeball ? '' : 'closedPokeball fade-out' : 'openPokeball'}`}>
      {!isStopped ?
      <img className='w-50 fade-out' src={rewards[rewardIndex]} />
      : ''}
        {hideClosedPokeball ? <img className='w-75' src={rewards[rewardIndex]} /> :''}
    </div>
    </div>
  )
}

export default YourReward
