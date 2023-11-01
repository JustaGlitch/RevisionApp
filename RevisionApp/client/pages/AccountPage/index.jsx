import React from 'react'
import { Link } from 'react-router-dom'

function index() {
  return (
    <>
      <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center h-50"><Link to="/account/collection" className='accountCard h-100 p-5'>Collection</Link></div>
      <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center h-50"><Link to="/account/tasks" className='accountCard h-100 p-5'>All Tasks</Link></div>
      <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center h-50"><Link to="/account/settings" className='accountCard h-100 p-5'>Account</Link></div>
    </>
  )
}

export default index
