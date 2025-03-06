export interface Task {
  id: number;
  name: string;
  executionTime: Date;
  recurrence?: "daily" | "weekly" | "biweekly";
  status: "scheduled" | "executed";
}