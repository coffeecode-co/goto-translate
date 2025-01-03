import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const TranslateToaster = () => {
  const [selectedText, setSelectedText] = useState("");
  useEffect(() => {
    const handleSelection = () => {
      console.log(window.getSelection()?.toString().match(/\n/g)); // TODO: retirar
      const text = window.getSelection()?.toString();
      console.log(text); // TODO: retirar

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
    if (!selectedText) return;
    toast({
      title: selectedText,
      duration: 15000,
    });
  }, [selectedText]);
  return <Toaster />;
};
