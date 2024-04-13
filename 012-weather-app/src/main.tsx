import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

let API_KEY = null;

try {
  const module = await import("./WeatherAPIKey");
  API_KEY = module.API_KEY;
} catch (err) {
  console.log(err);
}

if (!API_KEY) {
  API_KEY = prompt("Please enter your WeatherAPI key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App apiKey={API_KEY} />
  </React.StrictMode>
);
