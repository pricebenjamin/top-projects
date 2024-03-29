import { useState } from "react";
import { Greet } from "@components/Greet";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello, world!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Greet />
      </div>
    </>
  );
}

export default App;
