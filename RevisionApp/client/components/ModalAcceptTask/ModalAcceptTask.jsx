import React, { useState } from "react";
import { ModalAcceptedTask } from "../../components";
import AcceptGIF from "../../assets/img/accept.gif";

function ModalAcceptTask({ id, title, description, suggested_time, class_id }) {
  const [suggestedTime = 30, setSuggestedTime] = useState(suggested_time);
  const handleSetSuggestedTime = (e) => {
    setSuggestedTime(e.target.value);
  };
  return (
    <>
      <div
        className="modal fade"
        id={`task-${id}`}
        tabIndex="-1"
        aria-labelledby={`taskLabel-${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`task-${id}`}>
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="container">
            <div className="row">
              <div className="col-8">
                <div className="modal-body">
                  <p>{description}</p>
                  <p>
                    Who is Responsible: <span className="small">{`Class ${class_id}`}</span>
                  </p>
                  <div className="mb-3">
                    <form>
                      <label
                        htmlFor={`suggestedTimeInput-${id}`}
                        className="col-form-label"
                      >
                        Suggested time (in minutes)
                      </label>
                      <input
                        type="number"
                        onChange={handleSetSuggestedTime}
                        className="form-control"
                        id={`suggestedTimeInput-${id}`}
                        value={suggestedTime}
                        required
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center">
                  <img className="img-fluid" src={AcceptGIF}/>
              </div>
            </div>
            </div>

            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-info text-white"
                data-bs-target={`#acceptedTaskModal-${id}`}
                data-bs-toggle="modal"
              >
                Accept the Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalAcceptedTask id={id} time={suggestedTime} class_id={class_id} />
    </>
  );
}

export default ModalAcceptTask;
