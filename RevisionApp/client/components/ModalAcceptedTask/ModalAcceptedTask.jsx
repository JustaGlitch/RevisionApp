import React from 'react'
import { Link } from 'react-router-dom'

function ModalAcceptedTask({id, time}) {
  return (
    <div className="modal fade" id={`acceptedTaskModal-${id}`} aria-hidden="true" aria-labelledby={`acceptedTaskModalLabel${id}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`acceptedTaskModalLabel${id}`}>Congratulation!</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>You've accepted the task.</p>
            <p className='lead'>Suggested time: <span className='small'>{time} min.</span></p>
          </div>
          <div className="modal-footer">
            <Link time={time} to={`/task/${id}`}><button type="button" className="btn btn-primary" data-bs-target={`#acceptedTaskModal-${id}`} data-bs-toggle="modal" >Go to the Task Page</button></Link>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAcceptedTask
