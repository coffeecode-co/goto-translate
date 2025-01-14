import { useEffect, useState } from "react";

import { useTranslateStore } from "./";

export const useTextSelection = () => {
  const [selectEvent, setSelectEvent] = useState<Event>(new Event(""));

  const setSelectedText = useTranslateStore((state) => state.setSelectedText);

  useEffect(() => {
    const handleMouseSelection = (e: Event) => {
      const text = window.getSelection()?.toString().trim();

      setSelectedText(text ?? "");
      setSelectEvent(e);
    };

    document.addEventListener("selectionchange", handleMouseSelection);
    return () =>
      document.removeEventListener("selectionchange", handleMouseSelection);
  }, [setSelectedText]);

  return [selectEvent];
};
