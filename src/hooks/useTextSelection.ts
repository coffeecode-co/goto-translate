import { useEffect } from "react";

import { useTranslateStore } from "./";

export const useTextSelection = () => {
  const setSelectedText = useTranslateStore((state) => state.setSelectedText);

  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString().trim();

      setSelectedText(text ?? "");
    };

    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, [setSelectedText]);
};
