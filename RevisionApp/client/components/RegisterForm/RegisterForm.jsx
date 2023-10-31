import React from 'react'

function RegisterForm() {
  return (
    <form className='w-75 p-4 bg-body-secondary shadow rounded'>
      <h3 className='text-center'>Register Page</h3>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="exampleInputPassword2"
              placeholder='Your Password Again'/>
            </div>
            <div className="mb-3">
              <label htmlFor="selectClass" className="form-label">Your Class</label>
              <select className="form-select" aria-label="Default select example">
                <option selected>Select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <button type="submit" className="btn btn-info offset-3 col-6 text-white">Register</button>
            </div>
          </form>
  )
}

export default RegisterForm
