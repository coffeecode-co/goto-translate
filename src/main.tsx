import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PopUp, TranslateToaster } from "./presentation/components/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopUp />
    <TranslateToaster />
    <input
      type="text"
      placeholder="acá"
      value={"en muy muy lejano, habia un ogro"}
    />
  </StrictMode>
);
