import { Todo } from "@interfaces/Todo";

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
