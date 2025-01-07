import { useState, useEffect } from "react";
import { TranslateService } from "@/services";
import { envs } from "@/config";

import { useTranslateStore } from "./useStore";

interface UseTranslationProps {
  text: string;
  targetLang: string;
}

export const useTranslation = ({ text, targetLang }: UseTranslationProps) => {
  const setTanslatedText = useTranslateStore(
    (state) => state.setTranslatedText
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const translateText = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const isTranslationEnabled = envs.VITE_TRANSLATION_ENABLED;
        if (!isTranslationEnabled) {
          setTanslatedText(text);
          return;
        }

        const apiKey = envs.VITE_GOOGLE_CLOUD_TRANSLATE_KEY;
        if (!apiKey) {
          throw new Error("Translation API key is not configured");
        }

        const translateService = new TranslateService({ api_key: apiKey });
        const translatedText = await translateService.translate({
          text,
          target: targetLang,
        });

        setTanslatedText(translatedText);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Translation failed"));
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, targetLang, setTanslatedText]);

  return { isLoading, error };
};
