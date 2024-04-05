import { Project } from "@components/Project";
import "./ProjectNavigator.css";

interface ProjectNavigatorProps {
  activeProject?: Project;
  projects?: Project[];
  onProjectSelect: (project: Project) => void;
}

export function ProjectNavigator({
  activeProject,
  projects,
  onProjectSelect,
}: ProjectNavigatorProps) {
  return (
    <div className="project-navigator">
      {projects && (
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={project.id === activeProject?.id ? "active" : ""}
              onClick={() => onProjectSelect(project)}
            >
              {project.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
