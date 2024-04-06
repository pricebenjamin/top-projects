import { Project, createNewProject } from "@components/Project";
import { Todo, createNewTodo } from "@components/Todo";

export interface ApplicationState {
  activeProjectId: string;
  projects: Project[];
  todos: Todo[];
}

const projects = [
  createNewProject({ title: "Unassigned" }),
  createNewProject({ title: "The Odin Project Tasks" }),
];

const todos = [
  createNewTodo(projects[0].id),
  createNewTodo(projects[1].id, { title: "Finish reading React section" }),
  createNewTodo(projects[1].id, { title: "Complete todo list project" }),
  createNewTodo(projects[1].id, { title: "Complete memory card project" }),
];

const activeProjectId = projects[1].id;

export const initialAppState: ApplicationState = {
  activeProjectId,
  projects,
  todos,
};
