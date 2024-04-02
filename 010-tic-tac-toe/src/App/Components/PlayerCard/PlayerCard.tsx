import { useRef, useState, useEffect } from "react";
import "./PlayerCard.css";

interface PlayerCardProps {
  symbol: string;
  name: string;
  setName: (name: string) => void;
  alignment: "left" | "right";
  active: boolean;
}

export function PlayerCard({
  symbol,
  name,
  setName,
  alignment,
  active,
}: PlayerCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const lookup = {
    left: "flex-start",
    right: "flex-end",
  };
  const alignItems = { alignItems: lookup[alignment] };
  const textAlign = { textAlign: alignment };

  const classList = ["player-card"];
  if (active) {
    classList.push("active");
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function saveName() {
    setName(input);
    setEditMode(false);
  }

  function edit() {
    setEditMode(true);
  }

  useEffect(() => {
    if (inputRef.current) {
      const style = window.getComputedStyle(inputRef.current);
      style.display === "block" && inputRef.current.focus();
    }
  });

  return (
    <div className={classList.join(" ")} style={alignItems}>
      <div className="symbol">{symbol}</div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInput}
        style={{ ...textAlign, display: editMode ? "block" : "none" }}
      />
      <div
        className="name"
        style={{ ...textAlign, display: editMode ? "none" : "block" }}
      >
        {name}
      </div>
      <button onClick={editMode ? saveName : edit}>
        {editMode ? "Save" : "Change Name"}
      </button>
    </div>
  );
}
