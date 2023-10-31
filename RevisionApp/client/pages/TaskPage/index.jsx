import React from 'react'
import { StopWatch, YourReward } from "../../components";

function index() {
  return (
    <div className="row h-100">
      <div className=" d-flex flex-column col-sm-12 col-md-6 align-items-center">
      <h1>Task 1</h1>
      <div className='lead'>Task description</div>
        <StopWatch />
      </div>
      <div className='col-sm-12 col-md-6'>
        <YourReward />
      </div>
    </div>
  )
}

export default index
