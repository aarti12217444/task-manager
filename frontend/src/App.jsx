import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask as deleteTaskRequest,
  getTasks,
  updateTaskStatus,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const cardRef = useRef(null);

  const getTaskElement = (id) =>
    document.querySelector(`[data-task-id="${id}"]`);

  const animateTaskToggle = (id) => {
    const element = getTaskElement(id);
    if (!element) {
      return;
    }

    gsap.fromTo(
      element,
      { scale: 1, boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)" },
      {
        scale: 1.01,
        boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.18)",
        duration: 0.16,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
      }
    );
  };

  const animateTaskExit = (id) =>
    new Promise((resolve) => {
      const element = getTaskElement(id);
      if (!element) {
        resolve();
        return;
      }

      gsap.to(element, {
        opacity: 0,
        x: 24,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        duration: 0.28,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });

  const fetchAllTasks = async () => {
    try {
      setError("");
      const taskList = await getTasks();
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (_err) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  const handleAddTask = async (title) => {
    if (!title.trim()) {
      setError("Task title is required.");
      return false;
    }

    try {
      setBusy(true);
      setError("");
      const newTask = await createTask(title);
      if (!newTask?.id) {
        throw new Error("Invalid task payload.");
      }
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      return true;
    } catch (_err) {
      setError("Failed to create task.");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      setBusy(true);
      setError("");
      const updatedTask = await updateTaskStatus(task.id, !task.completed);
      if (!updatedTask?.id) {
        throw new Error("Invalid task payload.");
      }
      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === updatedTask.id ? updatedTask : item))
      );
      setTimeout(() => {
        animateTaskToggle(updatedTask.id);
      }, 0);
    } catch (_err) {
      setError("Failed to update task.");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setBusy(true);
      setError("");
      await deleteTaskRequest(id);
      await animateTaskExit(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (_err) {
      setError("Failed to delete task.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container">
      <section className="card" ref={cardRef}>
        <header className="header">
          <div>
            <h1>Task Manager</h1>
            <p className="subtitle">Keep your day organized with simple task tracking.</p>
          </div>
          <span className="badge">{tasks.length} tasks</span>
        </header>

        <TaskForm onAddTask={handleAddTask} isSubmitting={busy} />

        {loading ? <p className="status-text">Loading tasks...</p> : null}
        {error ? <p className="error">{error}</p> : null}
        {!loading ? (
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            isBusy={busy}
          />
        ) : null}
      </section>
    </main>
  );
}

export default App;
