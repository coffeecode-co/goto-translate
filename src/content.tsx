import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <h1 className="fixed right-0 bottom-0">Hello Chrome Ext content_scripts</h1>
  </StrictMode>
);
