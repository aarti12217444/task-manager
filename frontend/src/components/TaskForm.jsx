import { useState } from "react";

function TaskForm({ onAddTask, isSubmitting }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const created = await onAddTask(title);
    if (created) {
      setTitle("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default TaskForm;
