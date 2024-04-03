import { Project } from "@components/Project";
import "./ProjectNavigator.css";

interface ProjectNavigatorProps {
  projects: Project[];
  onProjectSelect: (title: string) => void;
  onCreateProject: (project: Project) => void;
}

export function ProjectNavigator({
  projects,
  onProjectSelect,
  onCreateProject,
}: ProjectNavigatorProps) {
  function listItem(project: Project, index: number) {
    return (
      <li key={index} onClick={() => onProjectSelect(project.title)}>
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
      {projects.length > 0 && (
        <ul>
          {projects.map((project, idx) => listItem(project, idx))}
          <li className="create-project" onClick={createNewProject}>
            Create Project
          </li>
        </ul>
      )}
    </div>
  );
}
