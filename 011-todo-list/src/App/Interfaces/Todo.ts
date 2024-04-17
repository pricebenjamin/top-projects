import type { TodoPriority } from "@app/Types/TodoPriority";

export interface Todo {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: TodoPriority;
  finished: boolean;
  dueDate?: number;
}
