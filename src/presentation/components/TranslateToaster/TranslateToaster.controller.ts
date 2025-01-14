interface HandleHotkeyProps {
  eventTarget: HTMLInputElement;
  getEditableElements: (
    element: HTMLInputElement
  ) => HTMLInputElement | undefined;
  doTranslate: () => Promise<string | undefined>;
}

export const handleHotkey = async ({
  eventTarget,
  getEditableElements,
  doTranslate,
}: HandleHotkeyProps) => {
  try {
    const element = getEditableElements(eventTarget);
    const textSelected = document.getSelection()?.toString().trim();
    const text = await doTranslate();
    if (!textSelected) return;
    if (!element) return;
    if (!text) return;
    document.execCommand("insertText", false, text);
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};
