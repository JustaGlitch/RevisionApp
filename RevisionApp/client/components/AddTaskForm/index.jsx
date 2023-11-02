import React, { useState, useEffect } from "react";
function AddTaskForm({ onAddTask, isAdmin }) {
  // Local state for form fields.
  const [title, setTitle] = useState("");
  const [suggested_time, setSuggestedTime] = useState("");
  const [description, setDescription] = useState("");
  const [class_id, setClass_id] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const resp = await fetch("https://studydex.onrender.com/class");
      const result = await resp.json();
      setCategories(result);
    };
    getAllCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title, description, class_id, suggested_time);
    setTitle("");
    setSuggestedTime(0);
    setDescription("");
    setClass_id("");
    window.location.reload();
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
                onChange={(e) => setClass_id(e.target.value)}
              >
                {categories.map((el) => (
                  <option key={el.classname} value={el.classname}>
                    {el.classname}
                  </option>
                ))}
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
          <button className="btn bg-info text-white w-100" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTaskForm;
