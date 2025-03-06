import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface Task {
  id: number;
  name: string;
  executionTime: string;
  recurrence?: "daily" | "weekly" | "biweekly";
  status: "scheduled" | "executed";
}

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
  editTask: (id: number, executionTime: string) => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const editTask = async (id: number, executionTime: string) => {
    try {
      await axios.put(`http://localhost:3001/api/tasks/${id}`, { executionTime });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
