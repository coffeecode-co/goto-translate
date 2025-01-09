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
import { isEditableElement } from "@/config/utils";
import { GLOBAL_STRINGS } from "@/config";

import { handleHotkey } from "./TranslateToaster.controller";

import type { GotoTranslateData } from "..";

interface TranslateToasterProps {
  targetLanguage?: string;
}

const { TRANSLATE_ACTIVE } = GLOBAL_STRINGS.LOCAL_STORAGE_KEY;
const DEFAULT_TOAST_DURATION = 15000;
const ERROR_TOAST_DURATION = 5000;

export const TranslateToaster = ({
  targetLanguage = "en",
}: TranslateToasterProps) => {
  const [selectEvent] = useTextSelection();
  const { selectedText, translatedText } = useTranslateStore();
  const { error } = useTranslation({
    text: selectedText,
    targetLang: targetLanguage,
  });
  const [customStorage] = useLocalStorage();

  const getStorageValue = useCallback(async (): Promise<
    string | GotoTranslateData
  > => {
    const data = (await customStorage({
      op: "get",
      key: TRANSLATE_ACTIVE,
    })) as GotoTranslateData;

    return data?.gotoTranslateActive || data;
  }, [customStorage]);

  const showTranslationToast = useCallback(
    (text: string, isError = false) => {
      const noErrorDuration = text ? DEFAULT_TOAST_DURATION : 1;
      toast({
        title: isError ? "Translation Error" : text,
        description: isError ? error?.message : undefined,
        variant: isError ? "destructive" : undefined,
        duration: isError ? ERROR_TOAST_DURATION : noErrorDuration,
      });
    },
    [error?.message]
  );

  useHotkeyBind([
    {
      key: "a",
      modifiers: ["shiftKey"],
      action: () => {
        handleHotkey({
          eventTarget: selectEvent.target as HTMLInputElement,
          isEditableElement,
          text: translatedText,
        });
      },
    },
  ]);

  useEffect(() => {
    const translateText = async () => {
      const eventTarget = selectEvent.target as HTMLInputElement;

      try {
        const gotoIsActive = await getStorageValue();
        if (gotoIsActive !== "true") return;

        if (error) {
          showTranslationToast("", true);
          return;
        }

        if (!isEditableElement(eventTarget)) {
          showTranslationToast(translatedText);
        }
      } catch (error) {
        console.warn("Error in translation process:", error);
      }
    };

    if ((translatedText !== null && translatedText !== undefined) || error) {
      translateText();
    }
  }, [
    translatedText,
    error,
    getStorageValue,
    selectedText,
    selectEvent,
    showTranslationToast,
  ]);

  return <Toaster />;
};
