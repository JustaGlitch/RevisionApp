import React from 'react'
import {ModalAcceptTask} from '../../components'

function TaskCard({id, task}) {
  const { title, description, timestamp } = task;


  return (
    <div className="card-list mt-4" data-testid="task-card">
      <div className="card-list-head">
        <h6>{title}</h6>
      </div>

      <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" data-bs-toggle="modal" data-bs-target={`#task-${id}`}>
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">{title}</h6>
              <p className="mb-0 opacity-75">{description}</p>
            </div>
            <small className="opacity-50 text-nowrap">{timestamp}</small>
          </div>
           <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-success bg-gradient">Accept</button>
          </div>
        </a>
      </div>
      <ModalAcceptTask id={id}/>
    </div>
  );
}

export default TaskCard;
