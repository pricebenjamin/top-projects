import { Project } from "@interfaces/Project";

export function createNewProject({
  title = "New Project",
}: Partial<Project> = {}): Project {
  return {
    id: crypto.randomUUID(),
    title,
  };
}
