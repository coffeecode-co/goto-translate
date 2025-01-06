import { useEffect, useState } from "react";

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString().trim();
      if (text) {
        setSelectedText(text);
      }
    };

    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, []);

  return selectedText;
};
