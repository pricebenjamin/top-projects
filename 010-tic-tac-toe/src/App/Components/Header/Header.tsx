import "./Header.css";

interface HeaderProps {
  title: string;
  onGameReset: () => void;
}

export function Header({ title, onGameReset }: HeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <button onClick={onGameReset}>New Game</button>
      </nav>
    </header>
  );
}
