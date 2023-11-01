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
      {isAdmin && (
        <select
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
        >
          <option value="">Select Responsible</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          <option value="Tom Byrne">Tom Byrne</option>
        </select>
      )}

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
