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
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
