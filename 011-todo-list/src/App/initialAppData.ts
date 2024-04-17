import { createNewProject } from "@utilities/createNewProject";
import { createNewTodo } from "@utilities/createNewTodo";
import { ApplicationState } from "@interfaces/ApplicationState";

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
