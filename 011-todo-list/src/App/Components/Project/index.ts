export interface Project {
  id: string;
  title: string;
  activeTodoId?: string;
}

export function createNewProject({
  title = "New Project",
}: Partial<Project> = {}): Project {
  return {
    id: crypto.randomUUID(),
    title,
  };
}
