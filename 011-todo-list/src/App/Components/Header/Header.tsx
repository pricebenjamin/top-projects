import { Project } from "@components/Project";
import "./Header.css";

interface HeaderProps {
  project: Project;
  onProjectDelete: (id: string) => void;
  onTodoCreate: (id: string) => void;
}

export function Header({
  project,
  onProjectDelete,
  onTodoCreate,
}: HeaderProps) {
  return (
    <header className="header">
      <h1 className="active-project">{project.title}</h1>
      <nav>
        <button onClick={() => onTodoCreate(project.id)}>Add Todo</button>
        <button onClick={() => onProjectDelete(project.id)}>Delete</button>
      </nav>
    </header>
  );
}
