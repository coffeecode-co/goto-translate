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
import { getEditableElements } from "@/config/utils";
import { GLOBAL_STRINGS } from "@/config";

import { handleHotkey } from "./TranslateToaster.controller";

import type { GotoTranslateData } from "..";

const { TRANSLATE_ACTIVE } = GLOBAL_STRINGS.LOCAL_STORAGE_KEY;
const DEFAULT_TOAST_DURATION = 15000;
const ERROR_TOAST_DURATION = 5000;

export const TranslateToaster = () => {
  const [selectEvent] = useTextSelection();
  const { translatedText } = useTranslateStore();
  const { error: errorTranslate } = useTranslation({
    nativeLangKey: GLOBAL_STRINGS.LOCAL_STORAGE_KEY.NATIVE_LENGUAGE,
    targetLangKey: GLOBAL_STRINGS.LOCAL_STORAGE_KEY.TARGET_LENGUAGE,
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
      const theToast = toast({
        title: isError ? "Translation Error" : text,
        description: isError ? errorTranslate?.message : undefined,
        variant: isError ? "destructive" : undefined,
        duration: isError ? ERROR_TOAST_DURATION : DEFAULT_TOAST_DURATION,
      });
      if (!text) theToast.dismiss();
    },
    [errorTranslate?.message]
  );

  useHotkeyBind([
    {
      modifiers: ["shiftKey"],
      action: () => {
        handleHotkey({
          eventTarget: selectEvent.target as HTMLInputElement,
          getEditableElements,
          text: translatedText,
        });
      },
    },
  ]);

  useEffect(() => {
    const translateText = async () => {
      try {
        const gotoIsActive = await getStorageValue();
        if (gotoIsActive !== "true") return;

        if (errorTranslate) {
          showTranslationToast("", true);
          return;
        }

        showTranslationToast(translatedText);
      } catch (error) {
        console.warn("Error in translation process:", error);
      }
    };

    if (
      (translatedText !== null && translatedText !== undefined) ||
      errorTranslate
    ) {
      translateText();
    }
  }, [translatedText, errorTranslate, getStorageValue, showTranslationToast]);

  return <Toaster />;
};
