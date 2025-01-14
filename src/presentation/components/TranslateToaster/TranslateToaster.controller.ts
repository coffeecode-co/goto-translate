import { toast } from "@/hooks/use-toast";

interface HandleHotkeyProps {
  eventTarget: HTMLInputElement;
  getEditableElements: (
    element: HTMLInputElement
  ) => HTMLInputElement | undefined;
  translateActive: () => Promise<string>;
  doTranslate: () => Promise<string | undefined>;
}

const DEFAULT_TOAST_DURATION = 15000;

const showTranslationToast = (text: string) => {
  const theToast = toast({
    title: text,
    duration: DEFAULT_TOAST_DURATION,
  });
  if (!text) theToast.dismiss();
};

export const handleHotkey = async ({
  eventTarget,
  getEditableElements,
  translateActive,
  doTranslate,
}: HandleHotkeyProps) => {
  try {
    const element = getEditableElements(eventTarget);
    const textSelected = document.getSelection()?.toString().trim();
    const translateActived = await translateActive();
    if (translateActived === "false") return;
    const text = await doTranslate();
    if (!textSelected) return;
    if (!text) return;
    if (element) return document.execCommand("insertText", false, text);
    showTranslationToast(text);
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};
