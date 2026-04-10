function TaskItem({ task, onToggleTask, onDeleteTask, isBusy }) {
  return (
    <li className="task-item" data-task-id={task.id}>
      <label>
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task)}
          disabled={isBusy}
        />
        <span className={task.completed ? "completed" : ""}>{task.title}</span>
      </label>

      <button className="delete-btn" onClick={() => onDeleteTask(task.id)} disabled={isBusy}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
