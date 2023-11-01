import React, { useState, useEffect } from "react";
import { TaskCard, TasksTabs, AddTaskForm, TasksList } from "../../components";

function index() {
  const isAdmin = true;

  // State to store all tasks.
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Sample Task 1",
    //   description: "This is a dummy task description.",
    //   status: "Completed",
    //   timestamp: new Date().toLocaleString(),
    //   responsible: "Class 1",
    // },
    // {
    //   id: 2,
    //   title: "Sample Task 2",
    //   description: "Another dummy task description.",
    //   status: "In Progress",
    //   timestamp: new Date().toLocaleString(),
    //   responsible: "Tom Byrne",
    // },
  ]);

  // State to track the currently selected tab.
  const [selectedTab, setSelectedTab] = useState("All");
  console.log("Currently Selected Tab:", selectedTab);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://studydex.onrender.com/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  //Date Object to capture the current date and time
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

  // Function to handle the addition of a new task.
  const handleAddTask = (title, description, responsible) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      responsible,
      status: "In Progress",
      timestamp: formattedDateTime,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="col-sm-12 offset-md-1 col-md-7 bg-white p-4 rounded-4">
      <h1>List of Tasks</h1>

      {/* Form to add a new task. */}
      <AddTaskForm isAdmin={isAdmin} onAddTask={handleAddTask} />

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
