import React, {useEffect, useState} from 'react'

function YourReward({reward, isStopped, taskFinished, time, timer }) {
const [hideClosedPokeball, setHideClosedPokeball] = useState(false);
  useEffect(() => {
    if (isStopped) {
      const timer = setTimeout(() => {
        setHideClosedPokeball(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isStopped]);

  const reloadPage = () => {
  window.location.reload(false)
  }
  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100'>
   
      <>
        <h2>{!isStopped ? 'Your possible reward' : taskFinished ? 'Your Reward' : 'You need to spend more time'}</h2>
        {!taskFinished && !isStopped ?
        <div className={`d-flex flex-column align-items-center justify-content-center h-100 ${isStopped  ? (hideClosedPokeball ? '' : 'closedPokeball w-50 fade-out') : 'openPokeball w-100'}`}>

          <img className='w-50 fade-out' src={reward} />
      
            {hideClosedPokeball ? <img className='w-75' src={reward} /> :''}
        </div>
        : 
        <>
        <p>{`You need to spend at least ${time} minutes. You've spent ${Math.floor(timer/6000)} minutes`}</p>
        <p><button onClick={reloadPage} className='btn btn-info text-white'>Start Again</button></p>
        </>
        }
      
      </>
      

    
    </div>
  )
}

export default YourReward
