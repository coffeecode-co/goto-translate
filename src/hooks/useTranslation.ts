import { useState, useEffect } from "react";
import { TranslateService } from "@/services";

interface UseTranslationProps {
  text: string;
  targetLang: string;
}

export const useTranslation = ({ text, targetLang }: UseTranslationProps) => {
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const translateText = async () => {
      if (!text) return;

      try {
        setIsLoading(true);
        setError(null);

        const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_TRANSLATE_KEY;
        if (!apiKey) {
          throw new Error("Translation API key is not configured");
        }

        const translateService = new TranslateService({ api_key: apiKey });
        const translatedText = await translateService.translate({
          text,
          target: targetLang,
        });

        setTranslation(translatedText);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Translation failed"));
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, targetLang]);

  return { translation, isLoading, error };
};
