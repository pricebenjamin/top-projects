export interface Todo {
  title: string;
  description: string;
  dueDate: number | null;
  priority: "high" | "medium" | "low";
  finished: boolean;
}
