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
    //   class_id: "Class 1",
    // },
    // {
    //   id: 2,
    //   title: "Sample Task 2",
    //   description: "Another dummy task description.",
    //   status: "In Progress",
    //   timestamp: new Date().toLocaleString(),
    //   class_id: "Tom Byrne",
    // },
  ]);

  // State to track the currently selected tab.
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://studydex.onrender.com/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Transform the fetched tasks to match the expected structure
        const transformedTasks = data.map((task) => ({
          id: task.task_id,
          title: task.title,
          description: task.description,
          class_id: task.class_id,
          // suggested_time: Number(task.suggested_time.split(":")[1]),
          status: task.completed ? "Completed" : "In Progress",
        }));

        setTasks(transformedTasks);
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
  const handleAddTask = async (
    title,
    description,
<<<<<<< HEAD
    class_id = class_id,
    suggested_time = suggested_time
=======
    class_id,
    suggested_time
>>>>>>> e4f11d641209ed7910ae23dcb245f24a92e2728b
  ) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      class_id,
      status: "In Progress",
      suggested_time,
      timestamp: formattedDateTime,
    };
    console.log(newTask);
    try {
      const response = await fetch("https://studydex.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to send task to the API");
      }

      const returnedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, returnedTask]);
    } catch (error) {
      console.error("Error sending task:", error);
    }

    // setTasks([...tasks, newTask]);
  };

  return (
    <div className="col-sm-12 offset-md-1 col-md-7 bg-white p-4 rounded-4">
      <h1>List of Tasks</h1>

      {/* Form to add a new task. */}
      <AddTaskForm isAdmin={isAdmin} onAddTask={handleAddTask} />

      {/* Tabs UI. */}
      <TasksTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {selectedTab === "All" && (
            <TasksList key={selectedTab} tasks={tasks} filter="All" />
          )}
        </div>
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {selectedTab === "In Progress" && (
            <TasksList key={selectedTab} tasks={tasks} filter="In Progress" />
          )}
        </div>
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {selectedTab === "Completed" && (
            <TasksList key={selectedTab} tasks={tasks} filter="Completed" />
          )}
        </div>
        {/* <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {selectedTab === "In Progress" && (
            <TasksList key={selectedTab} tasks={tasks} filter="In Progress" />
          )}
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          {selectedTab === "Completed" && (
            <TasksList key={selectedTab} tasks={tasks} filter="Completed" />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default index;
