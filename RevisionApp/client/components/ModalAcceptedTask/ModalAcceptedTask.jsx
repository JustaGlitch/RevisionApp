import React from 'react'
import { Link, useParams } from 'react-router-dom'
import AcceptedGIF from "../../assets/img/accepted.gif";


function ModalAcceptedTask({id, suggestedTime}) {
  return (
    <div className="modal fade" id={`acceptedTaskModal-${id}`} aria-hidden="true" aria-labelledby={`acceptedTaskModalLabel${id}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`acceptedTaskModalLabel${id}`}>Congratulation!</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-8">
          <div className="modal-body d-flex flex-column justify-content-center h-100">
            <p>You've accepted the task.</p>
            <p className='lead'>Suggested time: <span className='small'>{suggestedTime} min.</span></p>
          </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
                  <img className="img-fluid" src={AcceptedGIF}/>
              </div>
          </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <Link time={suggestedTime} to={`/task/${id}`}><button type="button" className="btn btn-info text-white" data-bs-target={`#acceptedTaskModal-${id}`} data-bs-toggle="modal" >Go to the Task Page</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAcceptedTask
