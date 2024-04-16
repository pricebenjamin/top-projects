import { useState } from "react";

import menu from "@icons/menu.svg";
import "./Menu.css";

export function Menu() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="menu">
      <button onClick={() => setShowOverlay(!showOverlay)}>
        <img src={menu} className="icon" alt="menu" />
      </button>
      <div className="overlay">
        <ul style={{ display: showOverlay ? "" : "none" }}>
          <li>Toggle Units</li>
          <li>Foo bar</li>
          <li>Fizz buzz</li>
        </ul>
      </div>
    </div>
  );
}
