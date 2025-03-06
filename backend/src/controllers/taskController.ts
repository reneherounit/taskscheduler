import { Request, Response } from "express";
import { scheduleTask, getScheduledTasks, getExecutedTasks, updateTask, deleteTask } from "../services/taskScheduler";

export const createTask = (req: Request, res: Response): void => {
  const { name, executionTime, recurrence } = req.body;

  if (!name || !executionTime) {
    res.status(400).json({ error: "Task name and execution time are required." });
    return;
  }

  if (recurrence && !["daily", "weekly", "biweekly"].includes(recurrence)) {
    res.status(400).json({ error: "Invalid recurrence type. Must be 'daily', 'weekly', or 'biweekly'." });
    return;
  }

  const task = scheduleTask(name, new Date(executionTime), recurrence);
  res.status(201).json({ message: "Task scheduled", task });
};

export const getTasks = (req: Request, res: Response): void => {
  res.json(getScheduledTasks());
};

export const getExecutedTaskLog = (req: Request, res: Response): void => {
  res.json(getExecutedTasks());
};

export const updateTaskController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { executionTime } = req.body;

  const updatedTask = updateTask(Number(id), new Date(executionTime));
  if (!updatedTask) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json({ message: "Task updated successfully", task: updatedTask });
};

export const deleteTaskController = (req: Request, res: Response): void => {
  const { id } = req.params;
  const success = deleteTask(Number(id));

  if (!success) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json({ message: "Task deleted successfully" });
};
