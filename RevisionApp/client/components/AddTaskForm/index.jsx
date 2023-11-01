import React, { useState } from "react";
function AddTaskForm({ onAddTask, isAdmin }) {
  // Local state for form fields.
  const [title, setTitle] = useState("");
  const [suggested_time, setSuggestedTime] = useState("");
  const [description, setDescription] = useState("");
  const [class_id, setclass_id] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title, description, class_id, suggested_time);
    setTitle("");
    setSuggestedTime(0);
    setDescription("");
    setclass_id("");
  };
  // Renders a form to input task title and description.
  return (
    <div className="">
      <h5>Add New Task</h5>
      <form className="row mb-4 p-3 bg-light rounded" onSubmit={handleSubmit}>
        <div className="col-sm-12 col-md-4">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {isAdmin && (
          <>
            <div className="col-sm-12 col-md-4">
              <input
                className="form-control mb-3"
                type="number"
                placeholder="Suggested time"
                value={suggested_time}
                onChange={(e) => setSuggestedTime(e.target.value)}
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <select
                className="form-select"
                value={class_id}
                onChange={(e) => setclass_id(e.target.value)}
              >
                <option value="">Select class_id</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Tom Byrne">Tom Byrne</option>
              </select>
            </div>
          </>
        )}
        <div className="col-sm-12">
          <textarea
            className="form-control d-flex w-100 my-3"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-sm-12 offset-md-4 col-md-4">
          <button className="btn btn-info text-white w-100" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTaskForm;
