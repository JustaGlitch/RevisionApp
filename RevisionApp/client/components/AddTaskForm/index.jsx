import React, { useState } from "react";

function AddTaskForm({ onAddTask, isAdmin }) {
  // Local state for form fields.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title, description, responsible);
    setTitle("");
    setDescription("");
    setResponsible("");
  };

  // Renders a form to input task title and description.

  return (
    <div className="">
      
      <h5>Add New Task</h5>
    <form className="row mb-4 p-2 bg-light rounded" onSubmit={handleSubmit}>
      <div className="col-sm-12 col-md-4">
      <input
        className="form-control"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      </div>
      <div className="col-sm-12 col-md-6">
      <input
        className="form-control d-flex w-100"
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      </div>
      
            {isAdmin && (
              <div className="col-sm-12 col-md-6">
        <select
        className="form-select"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
        >
          <option value="">Select Responsible</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          <option value="Tom Byrne">Tom Byrne</option>
        </select>
        </div>
      )}
      <div className="col-sm-12 col-md-2">
      <button className="btn btn-info text-white justify-content-end" type="submit">Add Task</button>
      </div>
  


      <button type="submit">Add Task</button>
    </form>

    </div>
  );
}

export default AddTaskForm;
