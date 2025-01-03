import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const TranslateToaster = () => {
  const [selectedText, setSelectedText] = useState("");
  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString().trim();

      if (text && text.length > 0) {
        setSelectedText(text);
      }
    };

    document.addEventListener("mouseup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  useEffect(() => {
    toast({
      title: selectedText,
    });
  }, [selectedText]);
  return <></>;
};
