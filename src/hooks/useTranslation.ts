import { useState, useCallback } from "react";
import { TranslateService } from "@/services";
import { decode, envs, GLOBAL_STRINGS } from "@/config";

import { useLocalStorage, useTranslateStore } from ".";

interface UseTranslationProps {
  nativeLangKey: string;
  targetLangKey: string;
}

export const useTranslation = ({
  targetLangKey,
  nativeLangKey,
}: UseTranslationProps) => {
  const [customStorage] = useLocalStorage();
  const targetLang = useCallback(async (): Promise<string> => {
    const data = await customStorage({
      op: "get",
      key: targetLangKey,
    });

    return data ?? GLOBAL_STRINGS.POPUP_PICKERS.TARGET_LANGUAGE.DEFAULT_VALUE;
  }, [customStorage, targetLangKey]);
  const nativeLang = useCallback(async (): Promise<string> => {
    const data = await customStorage({
      op: "get",
      key: nativeLangKey,
    });

    return data ?? GLOBAL_STRINGS.POPUP_PICKERS.NATIVE_LANGUAGE.DEFAULT_VALUE;
  }, [customStorage, nativeLangKey]);
  const { setTranslatedText, selectedText, translatedText } =
    useTranslateStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const text = selectedText;

  const translateText = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const isTranslationEnabled = envs.VITE_TRANSLATION_ENABLED;
      if (!isTranslationEnabled || !text) {
        const decodedText = decode(text);
        const newText = decodedText ? `[ ${decodedText} ]` : "";
        setTranslatedText(newText);
        return newText;
      }

      const apiKey = envs.VITE_GOOGLE_CLOUD_TRANSLATE_KEY;
      if (!apiKey) {
        throw new Error("Translation API key is not configured");
      }

      const textForTranslate =
        (text || window.getSelection()?.toString().trim()) ?? "";
      const target = await targetLang();
      const native = await nativeLang();
      const translateService = new TranslateService({ api_key: apiKey });
      const thisTextLang = await translateService.detectLang({
        text: textForTranslate,
      });
      const targetForThis = thisTextLang === native ? target : native;
      const thisTranslatedText = await translateService.translate({
        text: textForTranslate,
        target: targetForThis,
      });

      const decodedText = decode(thisTranslatedText);
      setTranslatedText(decodedText);
      return decodedText;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Translation failed"));
    } finally {
      setIsLoading(false);
    }

    return translatedText;
  };

  return { isLoading, error, translateText };
};
