import React from 'react'

function RegisterForm() {
  return (
    <form className='w-75 p-4 bg-body-secondary shadow rounded'>
      <h3 className='text-center'>Register Page</h3>
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
            <div class="mb-3">
              <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="exampleInputPassword2"
              placeholder='Your Password Again'/>
            </div>
            <div class="mb-3">
              <label for="selectClass" class="form-label">Your Class</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <button type="submit" class="btn btn-info offset-3 col-6 text-white">Register</button>
            </div>
          </form>
  )
}

export default RegisterForm
