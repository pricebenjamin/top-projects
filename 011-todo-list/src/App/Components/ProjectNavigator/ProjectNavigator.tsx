import { Project } from "@components/Project";
import "./ProjectNavigator.css";

interface ProjectNavigatorProps {
  projects: Project[];
  onProjectSelect: (title: string) => void;
}

export function ProjectNavigator({
  projects,
  onProjectSelect,
}: ProjectNavigatorProps) {
  function listItem(project: Project, index: number) {
    return (
      <li key={index} onClick={() => onProjectSelect(project.title)}>
        {project.title}
      </li>
    );
  }

  return (
    <div className="project-navigator">
      {projects.length > 0 && (
        <ul>
          {projects.map((project, idx) => listItem(project, idx))}
          <li className="create-project">Create Project</li>
        </ul>
      )}
    </div>
  );
}
