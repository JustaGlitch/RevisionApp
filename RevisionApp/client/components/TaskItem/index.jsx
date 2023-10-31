function TaskItem({ task, toggleTask }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      {task.taskName}
    </li>
  );
}

export default TaskItem;
