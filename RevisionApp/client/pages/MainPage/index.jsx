import React, {useState} from 'react'
import { TaskCard, TaskTabs } from '../../components'

function index() {

  return (
    <div className='col-sm-12 offset-md-1 col-md-7 bg-white p-4 rounded-4'>
      <h1>List of Tasks</h1>
      <TaskTabs/>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <TaskCard id={'1'} />
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <TaskCard id={'2'} />
        </div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
          <TaskCard id={'3'} />
        </div>
      </div>
    </div>
  )
}

export default index
