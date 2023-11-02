import React from 'react'
import {Link} from 'react-router-dom'

function LoginForm() {
  return (
    <>
    <form className='w-75 p-4 bg-body-secondary shadow rounded'>
      <h3 className='text-center'>Login Page</h3>
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
          Do not have an account? <Link to='/register'>Sign Up</Link>
        </div>
        <button type="submit" className="btn btn-info offset-3 col-6 text-white">Login</button>
      </div>
    </form>
    </>
  )
}

export default LoginForm
