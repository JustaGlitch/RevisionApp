import React from "react";
import TaskCard from "../TaskCard/TaskCard";

function TasksList({ tasks, filter, currentClass }) {
  // Filters tasks based on the filter parameter.
  let filteredTasks = tasks;
  if (filter !== "All") {
    filteredTasks = tasks.filter((task) => task.status === filter);
  }
  const defaultClassId = currentClass == null ? "Class 1" : currentClass;
  const defaultClassIdNumber = Number(defaultClassId.split(" ").at(-1));
  filteredTasks = filteredTasks.filter((task) => {
    return task.class_id === defaultClassIdNumber;
  });
  const groupedTasks = [];
  filteredTasks.forEach(async (task) => {
    const classIdGroup = groupedTasks.find(
      (group) => group.class_id === task.class_id
    );
    if (classIdGroup) {
      classIdGroup.tasks.push(task);
    } else {
      groupedTasks.push({ class_id: task.class_id, tasks: [task] });
    }
  });

  return (
    <>
      {groupedTasks.map((group) => (
        <div key={group.class_id}>
          <div
            key={group.class_id}
            className="card-list mt-4"
            data-testid="task-card"
          >
            <div className="card-list-head">
              <h6 className="text-white">{`Class ${group.class_id}`}</h6>
            </div>
            {group.tasks.map((task) => (
              <TaskCard key={task.id} id={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default TasksList;
