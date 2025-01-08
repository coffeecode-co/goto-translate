import { useEffect, useState } from "react";

import { useTranslateStore } from "./";

export const useTextSelection = () => {
  const [selectEvent, setSelectEvent] = useState<Event>(new Event(""));
  const setSelectedText = useTranslateStore((state) => state.setSelectedText);

  useEffect(() => {
    const handleSelection = (e: Event) => {
      const text = window.getSelection()?.toString().trim();

      setSelectedText(text ?? "");
      setSelectEvent(e);
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, [setSelectedText]);

  return [selectEvent];
};
