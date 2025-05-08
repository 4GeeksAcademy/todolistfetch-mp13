import React, { useEffect, useState } from "react";

const username = "marco_todolist";
const baseURL = "https://playground.4geeks.com/todo";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    createUser(); 
    getTasks(); 
  }, []);

  const createUser = async () => {
    try {
      await fetch(`${baseURL}/users/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
    } catch (err) {
      console.error("Error al crear usuario", err);
    }
  };

  const getTasks = async () => {
    try {
      const res = await fetch(`${baseURL}/users/${username}`);
      const data = await res.json();
      setTasks(data.todos || []);
    } catch (err) {
      console.error("Error al cargar tareas", err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      label: input,
      is_done: false
    };

    try {
      await fetch(`${baseURL}/todos/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      setInput("");
      getTasks();
    } catch (err) {
      console.error("Error al agregar tarea", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${baseURL}/todos/${id}`, {
        method: "DELETE",
      });
      getTasks();
    } catch (err) {
      console.error("Error al eliminar tarea", err);
    }
  };

  const deleteAllTasks = async () => {
    for (const task of tasks) {
      await fetch(`${baseURL}/todos/${task.id}`, {
        method: "DELETE",
      });
    }
    setTasks([]);
  };

  return (
    <div className="todo-container">
      <form onSubmit={addTask}>
        <input
          type="text"
          className="form-control"
          placeholder="Escribe una tarea y presiona Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      <ul className="list-group mt-3">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between tarea-item">
            {task.label}
            <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button className="btn btn-warning mt-3" onClick={deleteAllTasks}>
          🧹 Borrar todas
        </button>
      )}
    </div>
  );
};

export default TodoList;
