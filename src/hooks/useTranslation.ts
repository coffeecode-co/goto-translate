import { useState, useEffect, useCallback } from "react";
import { TranslateService } from "@/services";
import { decode, envs } from "@/config";

import { GotoTranslateData } from "@/presentation/components";
import { useLocalStorage, useTranslateStore } from ".";

interface UseTranslationProps {
  text: string;
  nativeLangKey: string;
  targetLangKey: string;
}

export const useTranslation = ({
  text,
  targetLangKey,
  nativeLangKey,
}: UseTranslationProps) => {
  const [customStorage] = useLocalStorage();
  const targetLang = useCallback(async (): Promise<
    string | GotoTranslateData
  > => {
    const data = (await customStorage({
      op: "get",
      key: targetLangKey,
    })) as GotoTranslateData;

    return data?.gotoTranslateActive || data;
  }, [customStorage, targetLangKey]);
  const nativeLang = useCallback(async (): Promise<
    string | GotoTranslateData
  > => {
    const data = (await customStorage({
      op: "get",
      key: nativeLangKey,
    })) as GotoTranslateData;

    return data?.gotoTranslateActive || data;
  }, [customStorage, nativeLangKey]);
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
        if (!isTranslationEnabled || !text) {
          const decodedText = decode(text);
          setTanslatedText(decodedText ? `[ ${decodedText} ]` : "");
          return;
        }

        const apiKey = envs.VITE_GOOGLE_CLOUD_TRANSLATE_KEY;
        if (!apiKey) {
          throw new Error("Translation API key is not configured");
        }

        const target = (await targetLang()) as string;
        const native = (await nativeLang()) as string;
        const translateService = new TranslateService({ api_key: apiKey });
        const thisTextLang = await translateService.detectLang({ text });
        const targetForThis = thisTextLang === native ? target : native;
        const translatedText = await translateService.translate({
          text,
          target: targetForThis,
        });

        const decodedText = decode(translatedText);
        setTanslatedText(decodedText);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Translation failed"));
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, targetLang, nativeLang, setTanslatedText]);

  return { isLoading, error };
};
