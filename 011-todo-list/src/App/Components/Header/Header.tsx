import { Project } from "@components/Project";
import "./Header.css";

interface HeaderProps {
  project: Project;
  onProjectDelete: (id: string) => void;
  onProjectTitleChange: (id: string, title: string) => void;
  onTodoCreate: (id: string) => void;
}

export function Header({
  project,
  onProjectDelete,
  onProjectTitleChange,
  onTodoCreate,
}: HeaderProps) {
  return (
    <header className="header">
      <h1 className="active-project">
        <input
          type="text"
          value={project.title}
          onChange={(event) =>
            onProjectTitleChange(project.id, event.target.value)
          }
        />
      </h1>
      <nav>
        <button onClick={() => onTodoCreate(project.id)}>Add Todo</button>
        <button onClick={() => onProjectDelete(project.id)}>Delete</button>
      </nav>
    </header>
  );
}
