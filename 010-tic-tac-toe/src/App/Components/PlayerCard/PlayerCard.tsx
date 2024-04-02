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
  const [input, setInput] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const classList = ["player-card"];
  if (active) {
    classList.push("active");
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function save() {
    setEditMode(false);
    onNameChange(input);
  }

  function edit() {
    setEditMode(true);
  }

  useEffect(() => {
    if (inputRef.current && editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className={classList.join(" ")}>
      <div className="symbol">{symbol}</div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        maxLength={10}
        disabled={!editMode}
      />
      <button onClick={editMode ? save : edit}>
        {editMode ? "Save" : "Change Name"}
      </button>
    </div>
  );
}
