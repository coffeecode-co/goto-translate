interface HandleHotkeyProps {
  eventTarget: HTMLInputElement;
  getEditableElements: (
    element: HTMLInputElement
  ) => HTMLInputElement | undefined;
  text: string;
}

export const handleHotkey = async ({
  eventTarget,
  getEditableElements,
  text,
}: HandleHotkeyProps) => {
  try {
    const element = getEditableElements(eventTarget);
    if (!document.getSelection()?.toString().trim()) return;
    if (!element) return;
    if (!text) return;
    document.execCommand("insertText", false, text);
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};
