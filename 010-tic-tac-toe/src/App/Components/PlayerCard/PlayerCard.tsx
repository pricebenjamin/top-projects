import { useRef, useState, useEffect } from "react";
import "./PlayerCard.css";

interface PlayerCardProps {
  symbol: string;
  name: string;
  active: boolean;
  onNameChange: (name: string) => void;
}

export function PlayerCard({
  symbol,
  name,
  active,
  onNameChange,
}: PlayerCardProps) {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    onNameChange(event.target.value);
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onNameChange(event.target.value);
      toggleEditMode();
    }
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  useEffect(() => {
    if (inputRef.current && editMode) {
      inputRef.current.select();
    }
  }, [editMode]);

  return (
    <div className={`player-card ${active ? "active" : ""}`}>
      <div className="symbol">{symbol}</div>
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={handleInput}
        onKeyDown={handleEnterKey}
        maxLength={10}
        disabled={!editMode}
      />
      <button onClick={toggleEditMode}>
        {editMode ? "Save" : "Change Name"}
      </button>
    </div>
  );
}
