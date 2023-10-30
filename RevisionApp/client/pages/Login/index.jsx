import React from 'react'
import Greetings from "../../assets/img/register.gif";
import {LoginForm} from "../../components";

function index() {
  return (
    <div className='container h-100'>
      <div className='row h-100'>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
          <LoginForm/>
        </div>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center h-75">
          <img src={Greetings}/>
        </div>
      </div>
    </div>
  )
}

export default index
