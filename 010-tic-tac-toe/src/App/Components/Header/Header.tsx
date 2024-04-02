import "./Header.css";

type onClick = () => void;

interface HeaderProps {
  title: string;
  actions: Map<string, onClick>;
}

export function Header({ title, actions }: HeaderProps) {
  const buttons = [...actions.entries()].map(([key, onClick]) => (
    <button {...{ key, onClick }}>{key}</button>
  ));
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>{buttons}</nav>
    </header>
  );
}
