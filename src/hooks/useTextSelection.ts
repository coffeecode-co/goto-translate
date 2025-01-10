import { useEffect, useState } from "react";

import { useTranslateStore } from "./";

export const useTextSelection = () => {
  const [selectEvent, setSelectEvent] = useState<Event>(new Event(""));

  const setSelectedText = useTranslateStore((state) => state.setSelectedText);

  useEffect(() => {
    const handleMouseSelection = () => {
      const text = window.getSelection()?.toString().trim();

      setSelectedText(text ?? "");
    };

    document.addEventListener("mouseup", handleMouseSelection);
    return () => document.removeEventListener("mouseup", handleMouseSelection);
  }, [setSelectedText]);

  useEffect(() => {
    document.addEventListener("selectionchange", setSelectEvent);
    return () =>
      document.removeEventListener("selectionchange", setSelectEvent);
  }, [setSelectEvent]);

  return [selectEvent];
};
