import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";

export default function Todo() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token")

  const {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    toggleComplete,
    todos,
  } = useContext(TodoContext);

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      return;
    }
    if (!task.trim()) return;

    if (editId) {
      await updateTodo(editId, { title: task });
      setEditId(null);
    } else {
      await createTodo({ title: task });
    }

    setTask("");
  };

  const handleEdit = (todo) => {
    setTask(todo.title);
    setEditId(todo._id);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    alert("Deleted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Todo App</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white cursor-pointer px-4 rounded-md hover:bg-blue-600">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="space-y-3">
          {todos?.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks yet</p>
          ) : (
            todos?.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md border"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo._id)}
                  />
                  <span
                    className={
                      todo.completed ? "line-through text-gray-400" : ""
                    }
                  >
                    {todo.title}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
