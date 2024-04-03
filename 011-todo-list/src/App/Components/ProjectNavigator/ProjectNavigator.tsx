import { Project } from "@components/Project";
import "./ProjectNavigator.css";

interface ProjectNavigatorProps {
  projects: Project[];
}

export function ProjectNavigator({ projects }: ProjectNavigatorProps) {
  return (
    <div className="project-navigator">
      {projects.length > 0 && (
        <ul>
          {projects.map((p, idx) => (
            <li key={idx}>{p.title}</li>
          ))}
          <li className="create-project">Create Project</li>
        </ul>
      )}
    </div>
  );
}
