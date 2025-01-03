import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TranslateService } from "@/services";

export const TranslateToaster = () => {
  const [selectedText, setSelectedText] = useState("");
  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString();

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
    const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_TRANSLATE_KEY; // Replace with your Deepl API key

    const translateService = new TranslateService({ api_key: apiKey });

    if (!selectedText) return;
    (async () => {
      const translatedText = await translateService.translate({
        text: selectedText,
        target: "en",
      });
      toast({
        title: translatedText,
        duration: 15000,
      });
    })();
  }, [selectedText]);
  return <Toaster />;
};
