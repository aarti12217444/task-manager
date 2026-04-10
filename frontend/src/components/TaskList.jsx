import TaskItem from "./TaskItem";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function TaskList({ tasks, onToggleTask, onDeleteTask, isBusy }) {
  const listRef = useRef(null);
  const safeTasks = Array.isArray(tasks) ? tasks.filter((task) => task?.id) : [];

  useLayoutEffect(() => {
    if (!listRef.current || safeTasks.length === 0) {
      return;
    }

    const elements = listRef.current.querySelectorAll(".task-item");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [safeTasks]);

  if (safeTasks.length === 0) {
    return <p className="empty-state">No tasks yet.</p>;
  }

  return (
    <ul className="task-list" ref={listRef}>
      {safeTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          isBusy={isBusy}
        />
      ))}
    </ul>
  );
}

export default TaskList;
