import { TodoEditor } from "./TodoEditor";

export { TodoEditor };

export interface Todo {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: "high" | "normal" | "low";
  finished: boolean;
  dueDate?: number;
}

export function createNewTodo(
  projectId: string,
  {
    title = "New Todo",
    description = "",
    priority = "normal",
    finished = false,
  }: Partial<Todo> = {}
): Todo {
  return {
    id: crypto.randomUUID(),
    projectId,
    title,
    description,
    priority,
    finished,
  };
}
