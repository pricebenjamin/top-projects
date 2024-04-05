export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: number | null;
  priority: "high" | "normal" | "low";
  finished: boolean;
}

export function createNewTodo({
  title = "New Todo",
  description = "",
  dueDate = null,
  priority = "low",
  finished = false,
}: Partial<Todo> = {}): Todo {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    finished,
  };
}
