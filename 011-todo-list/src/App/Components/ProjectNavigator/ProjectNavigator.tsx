import { Project } from "@components/Project";
import "./ProjectNavigator.css";

interface ProjectNavigatorProps {
  activeProject: string;
  projects: Project[];
  onProjectSelect: (title: string) => void;
  onCreateProject: (project: Project) => void;
}

export function ProjectNavigator({
  activeProject,
  projects,
  onProjectSelect,
  onCreateProject,
}: ProjectNavigatorProps) {
  function listItem(project: Project, index: number) {
    return (
      <li
        key={index}
        className={project.title === activeProject ? "active" : ""}
        onClick={() => onProjectSelect(project.title)}
      >
        {project.title}
      </li>
    );
  }

  function createNewProject() {
    const project = {
      title: "New Project",
      description: "",
      dueDate: null,
      priority: "low",
      todos: [],
    };
    onCreateProject(project);
  }

  return (
    <div className="project-navigator">
      <ul>
        {projects.map((project, idx) => listItem(project, idx))}
        <li className="create-project" onClick={createNewProject}>
          Create Project
        </li>
      </ul>
    </div>
  );
}
