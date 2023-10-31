import React from 'react'
import { TaskCard } from '../../components'

function index() {
  return (
    <div className='col-sm-12 offset-md-1 col-md-7 bg-white p-4 rounded-4'>
      <h1>List of Tasks</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">In Progress</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Completed</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <TaskCard />
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
      </div>
    </div>
  )
}

export default index
