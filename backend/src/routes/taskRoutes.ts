import express from "express";
import { createTask, getTasks, getExecutedTaskLog, updateTaskController, deleteTaskController } from "../controllers/taskController";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/log", getExecutedTaskLog);
router.put("/tasks/:id", updateTaskController);
router.delete("/tasks/:id", deleteTaskController);

export default router;