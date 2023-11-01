import React from "react";
import TaskCard from "../TaskCard/TaskCard";

function TasksList({ tasks, filter }) {
  // Filters tasks based on the filter parameter.
  let filteredTasks = tasks;
  if (filter !== "All") {
    filteredTasks = tasks.filter((task) => task.status === filter);
  }

  // Maps over the filtered tasks and renders TaskCard for each.
  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} id={task.id} task={task} />
      ))}
    </div>
  );
}

export default TasksList;
