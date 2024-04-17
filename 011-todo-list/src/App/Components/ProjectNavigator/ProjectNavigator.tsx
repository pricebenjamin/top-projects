import { Project } from "@interfaces/Project";
import "./ProjectNavigator.css";

interface ProjectNavigatorProps {
  activeProjectId: string;
  projects: Project[];
  onProjectSelect: (id: string) => void;
  onCreateProject: () => void;
}

export function ProjectNavigator({
  activeProjectId,
  projects,
  onProjectSelect,
  onCreateProject,
}: ProjectNavigatorProps) {
  return (
    <div className="project-navigator">
      <ul>
        <li className="create-project" onClick={onCreateProject}>
          Create Project
        </li>
        {projects.map((project) => (
          <li
            key={project.id}
            className={project.id === activeProjectId ? "active" : ""}
            onClick={() => onProjectSelect(project.id)}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
