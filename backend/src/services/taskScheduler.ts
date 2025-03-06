import { Task } from "../models/taskModel";

export let tasks: Task[] = [];
let taskId = 1;

// Schedule a new task (One-time or Recurring: Daily, Weekly, Biweekly)
export const scheduleTask = (name: string, executionTime: Date, recurrence?: "daily" | "weekly" | "biweekly"): Task => {
  const newTask: Task = {
    id: taskId++,
    name,
    executionTime,
    recurrence,
    status: "scheduled",
  };

  tasks.push(newTask);

  // Schedule first execution
  const delay = new Date(executionTime).getTime() - Date.now();
  if (delay > 0) {
    setTimeout(() => executeTask(newTask.id), delay);
  }

  // Handle recurrence
  if (recurrence) {
    let interval: number;

    switch (recurrence) {
      case "daily":
        interval = 24 * 60 * 60 * 1000;
        break;
      case "weekly":
        interval = 7 * 24 * 60 * 60 * 1000;
        break;
      case "biweekly":
        interval = 14 * 24 * 60 * 60 * 1000;
        break;
      default:
        return newTask;
    }

    setInterval(() => executeTask(newTask.id), interval);
  }

  return newTask;
};

// Execute a task and update status
const executeTask = (taskId: number) => {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = "executed";
    console.log(`Task Executed: ${tasks[taskIndex].name} at ${new Date().toISOString()}`);
  }
};

// Get all scheduled tasks
export const getScheduledTasks = (): Task[] => {
  return tasks.filter((task) => task.status === "scheduled");
};

// Get all executed tasks
export const getExecutedTasks = (): Task[] => {
  return tasks.filter((task) => task.status === "executed");
};


// Update a scheduled task
export const updateTask = (id: number, executionTime: Date): Task | null => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return null;

  tasks[taskIndex].executionTime = executionTime;
  return tasks[taskIndex];
};

// Delete a scheduled task
export const deleteTask = (id: number): boolean => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return false;

  tasks.splice(taskIndex, 1);
  return true;
};
