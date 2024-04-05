import { Project } from "@components/Project";
import "./Header.css";

type onClick = () => void;

interface HeaderProps {
  title: string;
  project: Project;
  actions?: Map<string, onClick>;
}

export function Header({ title, project, actions }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="application-title">{title}</h1>
      <h2 className="active-project">{project.title}</h2>
      {actions && (
        <nav>
          {[...actions.entries()].map(([name, onClick]) => (
            <button key={name} onClick={onClick}>
              {name}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
