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
    if (!element) return;
    if (!text) return;
    element.value = text;
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};
