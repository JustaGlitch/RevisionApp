import React from 'react'
import {ModalAcceptTask} from '../../components'

function TaskCard({id}) {
  return (
    <div className="card-list mt-4">
      <div className="card-list-head">
        <h6>Class 1</h6>
      </div>
      <div className="list-group"> 
      <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" data-bs-toggle="modal" data-bs-target={`#task-${id}`}>
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 className="mb-0">List group item heading</h6>
            <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
          <small className="opacity-50 text-nowrap">now</small>
          </div>
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-success bg-gradient">Accept</button>
          </div>
        </div>
      </a>
      </div>
      <ModalAcceptTask id={id}/>
    </div>
  )
}

export default TaskCard
