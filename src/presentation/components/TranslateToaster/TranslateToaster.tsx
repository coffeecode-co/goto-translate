import { useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";

import {
  useLocalStorage,
  useTranslation,
  useTextSelection,
  useHotkeyBind,
} from "@/hooks";
import { getEditableElements } from "@/config/utils";
import { GLOBAL_STRINGS } from "@/config";

import { handleHotkey } from "./TranslateToaster.controller";

const { TRANSLATE_ACTIVE } = GLOBAL_STRINGS.LOCAL_STORAGE_KEY;

export const TranslateToaster = () => {
  const [selectEvent] = useTextSelection();
  const { translateText } = useTranslation({
    nativeLangKey: GLOBAL_STRINGS.LOCAL_STORAGE_KEY.NATIVE_LENGUAGE,
    targetLangKey: GLOBAL_STRINGS.LOCAL_STORAGE_KEY.TARGET_LENGUAGE,
  });
  const [customStorage] = useLocalStorage();

  const getStorageValue = useCallback(async (): Promise<string> => {
    const data = await customStorage({
      op: "get",
      key: TRANSLATE_ACTIVE,
    });

    return data ?? "false";
  }, [customStorage]);

  useHotkeyBind([
    {
      modifiers: ["shiftKey"],
      action: () => {
        handleHotkey({
          eventTarget: selectEvent.target as HTMLInputElement,
          getEditableElements,
          translateActive: getStorageValue,
          doTranslate: translateText,
        });
      },
    },
  ]);

  return <Toaster />;
};
