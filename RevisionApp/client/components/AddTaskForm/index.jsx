import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
  // Local state for form fields.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title, description);
    setTitle("");
    setDescription("");
  };

  // Renders a form to input task title and description.
  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
   
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Add Task</button>
          </form>
        </div>
        </div>
      </div>
    </div>

  );
}

export default AddTaskForm;
