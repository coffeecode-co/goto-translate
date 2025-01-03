import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TranslateToaster } from "./presentation/components";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <TranslateToaster />
  </StrictMode>
);
