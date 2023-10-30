import React from 'react'

function LoginForm() {
  return (
    <>
    <form className='w-75 p-4 bg-body-secondary shadow rounded'>
    <h3 className='text-center'>Login Page</h3>
            <div class="form-group">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder='Your Name'/>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1"
              placeholder='Your Password'/>
            </div>
           
            <button type="submit" class="btn btn-info offset-3 col-6 text-white">Register</button>
            </div>
          </form>
          </>
  )
}

export default LoginForm
