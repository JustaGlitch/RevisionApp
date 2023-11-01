import React from 'react'
import { NavLink } from 'react-router-dom';
import acc from "../../assets/img/acc.webp";
import accBg from "../../assets/img/acc-bg.jpg";

function index() {
  return (
    <>
    <div className="offset-md-1 col-sm-12 col-md-6 d-flex justify-content-start align-items-start my-5">
<div>
  <h1>Account information</h1>
    <p className='lead'>Name: <span id='accountInfoName' className='fw-bold'>Tom Byrne</span></p>
    <hr/>
    <p className='lead'>Password: <span id='accountInfoPassword' className='fw-bold'>seagulls</span></p>
    <hr/>
    <p className='lead'>Your Class: <span id='accountInfoClass' className='fw-bold'>Class 1</span></p>
    <hr/>
    <p className='lead'>Your Collection: <span id='accountInfoClass'><NavLink to="/account/collection">18/510</NavLink></span></p>
    <hr/>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateYourInfo">Change your details</button>
</div>

    </div>
    <div className='col-md-1'></div>
    <div className="col-sm-12 col-md-4 h-100 d-flex justify-content-center align-items-center rounded-5 text-white accountSettingsChats px-4" style={{background: `url(${accBg}) center/cover no-repeat`}}>
      <img className="img-fluid" src={acc}/>
      </div>
      <div className="modal fade" id="updateYourInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Change Your Info</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
            <div className="form-group">
            <div className="mb-3">
              <label htmlFor="inputNewName" className="form-label">New Name</label>
              <input type="text" className="form-control" id="inputNewName" aria-describedby="emailHelp"
              placeholder='Enter your new name'/>
            </div>
            <div className="mb-3">
              <label htmlFor="inputNewPassword" className="form-label">New Password</label>
              <input type="password" className="form-control" id="inputNewPassword"
              placeholder='Enter your new password'/>
            </div>
            <div className="mb-3">
              <label htmlFor="inputNewPassword2" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="inputNewPassword2"
              placeholder='Confirm your new password'/>
            </div>
            </div>
        </form>
      </div>
      <div className="modal-footer justify-content-center">
            <button type="submit" className="btn btn-info offset-3 col-6 text-white">Update</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default index
