import { createNewProject } from "@components/Project";
import { createNewTodo } from "@components/Todo";

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

export default { activeProjectId, projects, todos };
