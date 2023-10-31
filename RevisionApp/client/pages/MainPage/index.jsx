import React, { useState } from "react";
import { AddTaskForm } from "../../components";
import { TasksTabs } from "../../components";
import { TasksList } from "../../components";

function index() {
  // State to store all tasks.
  const [tasks, setTasks] = useState([
    {
      // id: 1,
      // title: "Sample Task",
      // description: "Some placeholder content in a paragraph.",
      // status: "In Progress",
      // timestamp: "now",
    },
  ]);

  // State to track the currently selected tab.
  const [selectedTab, setSelectedTab] = useState("All");

  // Function to handle the addition of a new task.
  const handleAddTask = (title, description) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      status: "In Progress",
      timestamp: "now",
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="col-sm-12 offset-md-1 col-md-7 bg-white p-4 rounded-4">
      <h1>List of Tasks</h1>
      {/* Form to add a new task. */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Tabs UI. */}
      <TasksTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <div className="tab-content" id="myTabContent">
        {/* Content for each tab. It displays tasks based on the currently
        selected tab. */}
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {selectedTab === "All" && <TasksList tasks={tasks} filter="All" />}
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {selectedTab === "In Progress" && (
            <TasksList tasks={tasks} filter="In Progress" />
          )}
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          {selectedTab === "Completed" && (
            <TasksList tasks={tasks} filter="Completed" />
          )}
        </div>
      </div>
    </div>
  );
}

export default index;
