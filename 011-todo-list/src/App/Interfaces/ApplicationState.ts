import { Project } from "@interfaces/Project";
import { Todo } from "@interfaces/Todo";

export interface ApplicationState {
  activeProjectId: string;
  projects: Project[];
  todos: Todo[];
}
