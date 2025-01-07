import { useEffect } from "react";

import { useTranslateStore } from "./";

export const useTextSelection = () => {
  const setSelectedText = useTranslateStore((state) => state.setSelectedText);

  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString().trim();

      setSelectedText(text ?? "");
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, [setSelectedText]);
};
