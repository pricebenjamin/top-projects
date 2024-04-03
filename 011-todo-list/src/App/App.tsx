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

  return (
    <>
      <Header title="Todo List" project={activeProject} />
      <div className="container">
        <ProjectNavigator projects={projects} />
        <TodoList project={projects.find((p) => p.title === activeProject)} />
      </div>
    </>
  );
}

export default App;
