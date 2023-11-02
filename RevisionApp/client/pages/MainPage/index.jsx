import React, { useState, useEffect } from "react";
import { TaskCard, TasksTabs, AddTaskForm, TasksList } from "../../components";
import preloader from "../../assets/img/preloader2.gif";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function index() {
  // const isAdmin = true;
  const { userRole } = useContext(AuthContext); // Destructure userRole from context
  const isAdmin = userRole === "admin"; // Determine if the user is an admin

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
  const [userName, setUserName] = useState("");
  const [userClassName, setUserClassName] = useState(""); // Declare userClassName state

  const [loading, setLoading] = useState(false);
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
        setLoading(true);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://studydex.onrender.com/student/profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const profileData = await response.json();
        setUserName(profileData.username);
        setUserClassName(profileData.classname);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  const fetchCategoriesByName = async (name) => {
    const response = await fetch(
      `https://studydex.onrender.com/class/classname/${name}`
    );
    const data = await response.json();
    return data.class_id;
  };

  //Date Object to capture the current date and time
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

  // Function to handle the addition of a new task.
  const handleAddTask = async (
    title,
    description,
    class_id,
    suggested_time
  ) => {
    const cat = await fetchCategoriesByName(class_id);
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      class_id: cat,
      status: "In Progress",
      suggested_time: suggested_time,
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
      <h1>Welcome {userName}</h1>
      {/* Form to add a new task. */}
      <AddTaskForm isAdmin={isAdmin} onAddTask={handleAddTask} />

      {/* Tabs UI. */}
      <TasksTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      {/* Tab Content */}
      <div className="tab-content" id="myTabContent">
        {selectedTab === "All" && (
          <TasksList
            key={selectedTab}
            tasks={tasks}
            filter="All"
            userClassName={userClassName}
          />
        )}
        {selectedTab === "In Progress" && (
          <TasksList
            key={selectedTab}
            tasks={tasks}
            filter="In Progress"
            userClassName={userClassName}
          />
        )}
        {selectedTab === "Completed" && (
          <TasksList
            key={selectedTab}
            tasks={tasks}
            filter="Completed"
            userClassName={userClassName}
          />
        )}
      </div>
    </div>
  );
}

export default index;
