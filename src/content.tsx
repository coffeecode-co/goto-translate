import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.createElement("div");
root.id = "goto-roott";
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
