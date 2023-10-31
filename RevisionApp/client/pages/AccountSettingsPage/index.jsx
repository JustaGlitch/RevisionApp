import React from 'react'
import acc from "../../assets/img/acc.webp";
import accBg from "../../assets/img/acc-bg.jpg";

function index() {
  return (
    <>
    <div className="offset-md-1 col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
          <form className='w-75 p-4 bg-body-secondary shadow rounded'>
    <h3 className='text-center'>Update Your Info</h3>
            <div className="form-group">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder='Your Name'/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"
              placeholder='Your Password'/>
            </div>
            <button type="submit" className="btn btn-info offset-3 col-6 text-white">Update</button>
            </div>
          </form>
    </div>
    <div className='col-md-1'></div>
    <div className="col-sm-12 col-md-4 h-100 d-flex justify-content-center align-items-center rounded-5 text-white accountSettingsChats" style={{background: `url(${accBg}) center/cover no-repeat`}}>
      <img src={acc}/>
      </div>
    </>
  )
}

export default index
