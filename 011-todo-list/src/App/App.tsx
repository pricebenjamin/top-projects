import { useState, useEffect } from "react";
import { Header } from "@components/Header";
import { Project, createNewProject } from "@components/Project";
import { ProjectManager } from "@components/ProjectManager";
import { ProjectNavigator } from "@components/ProjectNavigator";
import appData from "./init.json?raw";
import "./App.css";

function App() {
  const [activeProject, setActiveProject] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const app = JSON.parse(appData);

    const id = app.activeProjectID as string;
    const projects = app.projects as Project[];

    setActiveProject(projects.find((p) => p.id === id));
    setProjects(projects);
  }, []);

  function deleteProject(project: Project) {
    const idx = projects.findIndex((p) => p.id === project.id);
    projects.splice(idx, 1);
    setProjects([...projects]);
    setActiveProject(undefined);
  }

  return (
    <>
      <Header
        title="Todo List"
        actions={
          new Map([
            [
              "Create Project",
              () => setProjects([...projects, createNewProject()]),
            ],
          ])
        }
      />
      <div className="container">
        <ProjectNavigator
          activeProject={activeProject}
          projects={projects}
          onProjectSelect={(project: Project) => setActiveProject(project)}
        />
        {activeProject && (
          <ProjectManager
            key={activeProject.id}
            project={activeProject}
            onProjectDelete={deleteProject}
          />
        )}
      </div>
    </>
  );
}

export default App;
