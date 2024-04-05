import "./Header.css";

type onClick = () => void;

interface HeaderProps {
  title: string;
  actions?: Map<string, onClick>;
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="application-title">{title}</h1>
      {actions && (
        <nav className="actions">
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
