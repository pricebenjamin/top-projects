import { useState, useEffect } from "react";
import { Header } from "@components/Header";
import { ProjectNavigator } from "@components/ProjectNavigator";
import { TodoList } from "@components/TodoList";
import { Project } from "@components/Project";
import appData from "./init.json?raw";
import "./App.css";

function App() {
  const [activeProject, setActiveProject] = useState<string>("default");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const app = JSON.parse(appData);
    console.log(app);
    setActiveProject(app.activeProject);
    setProjects(app.projects);
  }, []);

  function addProject(project: Project) {
    setProjects([...projects, project]);
  }

  function updateTodoStatus(index: number) {
    const project = projects.find((p) => p.title === activeProject);

    if (!project) {
      throw new Error("updateTodoStatus(): failed to find active project");
    }

    const todo = project.todos[index];

    todo.finished = !todo.finished;
    setProjects([...projects]);
  }

  return (
    <>
      <Header title="Todo List" project={activeProject} />
      <div className="container">
        <ProjectNavigator
          projects={projects}
          onProjectSelect={setActiveProject}
          onCreateProject={addProject}
        />
        <TodoList
          project={projects.find((p) => p.title === activeProject)}
          onTodoStatusChange={updateTodoStatus}
        />
      </div>
    </>
  );
}

export default App;
