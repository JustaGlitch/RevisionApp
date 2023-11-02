// import React from "react";
// import TaskCard from "../TaskCard/TaskCard";

// function TasksList({ tasks, filter }) {
//   // Filters tasks based on the filter parameter.
//   let filteredTasks = tasks;
//   if (filter !== "All") {
//     filteredTasks = tasks.filter((task) => task.status === filter);
//   }

//   const groupedTasks = [];
//   filteredTasks.forEach(async (task) => {
//     const classIdGroup = groupedTasks.find(
//       (group) => group.class_id === task.class_id
//     );
//     if (classIdGroup) {
//       classIdGroup.tasks.push(task);
//     } else {
//       groupedTasks.push({ class_id: task.class_id, tasks: [task] });
//     }
//   });

//   return (
//     <div>
//       {groupedTasks.map((group) => (
//         <div key={group.class_id}>
//           <div className="card-list mt-4" data-testid="task-card">
//             <div className="card-list-head">
//               <h6 className="text-white">{`Class ${group.class_id}`}</h6>
//             </div>
//             {group.tasks.map((task) => (
//               <TaskCard key={task.id} id={task.id} task={task} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TasksList;

import React from "react";
import TaskCard from "../TaskCard/TaskCard";

function TasksList({ tasks, filter, userClassName }) {
  const userClassId = userClassName
    ? parseInt(userClassName.split(" ")[1])
    : null;

  let filteredTasks = tasks.filter((task) => {
    const statusMatch = filter === "All" || task.status === filter;
    const classMatch = task.class_id === userClassId || task.class_id === null;
    return statusMatch && classMatch;
  });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const classIdStr =
      task.class_id === null ? "null" : task.class_id.toString();
    const classIdGroup = acc.find((group) => group.class_id === classIdStr);
    if (classIdGroup) {
      classIdGroup.tasks.push(task);
    } else {
      acc.push({ class_id: classIdStr, tasks: [task] });
    }
    return acc;
  }, []);

  return (
    <div>
      {groupedTasks.map((group) => (
        <div key={group.class_id}>
          <div className="card-list mt-4" data-testid="task-card">
            <div className="card-list-head">
              <h6 className="text-white">
                {group.class_id !== "null"
                  ? `Class ${group.class_id}`
                  : "Personal Tasks"}
              </h6>
            </div>
            {group.tasks.map((task) => (
              <TaskCard key={task.task_id} id={task.task_id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
