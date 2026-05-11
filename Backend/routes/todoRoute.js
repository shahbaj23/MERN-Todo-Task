import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { createTodo, deleteTodo, getAllTodo, toggleTodo, updateTodo } from '../controller/todoController.js';

const todoRouter = express.Router();

todoRouter.post("/create-todo", authMiddleware, createTodo)
todoRouter.put("/update-todo/:id", authMiddleware, updateTodo)
todoRouter.get("/get-todo", authMiddleware, getAllTodo)
todoRouter.delete("/delete-todo/:id", authMiddleware, deleteTodo)
todoRouter.put("/toggle-todo/:id", authMiddleware, toggleTodo)

export default todoRouter