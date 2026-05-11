import axios from "axios";
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  const createTodo = async (todoData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/todo/create-todo",
        todoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTodos((prev) => [...prev, response.data.todo]);

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const updateTodo = async (id, updateData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/todo/update-todo/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTodos((prev) =>
        prev.map((todo) => (todo._id == id ? response.data.todo : todo)),
      );
      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todo/get-todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/todo/delete-todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/todo/toggle-todo/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.todo : todo)),
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        createTodo,
        todos,
        updateTodo,
        getTodos,
        deleteTodo,
        toggleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
