import { useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import {
  useLocalStorage,
  useTranslateStore,
  useTranslation,
  useTextSelection,
  useHotkeyBind,
} from "@/hooks";
import { GotoTranslateData } from "..";

interface TranslateToasterProps {
  targetLanguage?: string;
}

const STORAGE_KEY = "gotoTranslateActive";

export const TranslateToaster = ({
  targetLanguage = "en",
}: TranslateToasterProps) => {
  const [selectEvent] = useTextSelection();
  const selectedText = useTranslateStore((state) => state.selectedText);
  const translatedText = useTranslateStore((state) => state.translatedText);
  const { error } = useTranslation({
    text: selectedText,
    targetLang: targetLanguage,
  });
  const [customStorage] = useLocalStorage();

  const getStorageValue = useCallback(async () => {
    const data = (await customStorage({
      op: "get",
      key: STORAGE_KEY,
    })) as GotoTranslateData;

    return data?.gotoTranslateActive || data;
  }, [customStorage]);

  useHotkeyBind([
    {
      key: "a",
      modifiers: ["ctrlKey", "shiftKey"],
      action: () => {
        const eventTarget = selectEvent.target as HTMLInputElement;
        try {
          if (
            !(
              eventTarget.nodeName === "INPUT" ||
              eventTarget.nodeName === "TEXTAREA"
            )
          ) {
            return;
          }
        } catch (error) {
          return error;
        }

        eventTarget.value = "azucar con pan";
      },
    },
  ]);

  useEffect(() => {
    const eventTarget = selectEvent.target as HTMLInputElement;
    const translateText = async () => {
      const gotoIsActive = await getStorageValue();
      const isActive = gotoIsActive === "true";
      if (!isActive) return;
      if (error) {
        toast({
          title: "Translation Error",
          description: error.message,
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      try {
        if (
          !(
            eventTarget.nodeName === "INPUT" ||
            eventTarget.nodeName === "TEXTAREA"
          )
        ) {
          toast({
            title: translatedText,
            duration: translatedText ? 15000 : 1,
          });
          // return;
        }
      } catch (error) {
        return error;
      }
    };
    translateText();
  }, [translatedText, error, getStorageValue, selectedText, selectEvent]);

  return <Toaster />;
};
