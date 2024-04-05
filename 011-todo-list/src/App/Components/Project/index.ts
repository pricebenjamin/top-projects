import { Todo } from "@components/Todo";

export interface Project {
  id: string;
  title: string;
  todos: Todo[];
}

export function createNewProject({
  title = "New Project",
  todos = [],
}: Partial<Project> = {}): Project {
  return {
    id: crypto.randomUUID(),
    title,
    todos,
  };
}
