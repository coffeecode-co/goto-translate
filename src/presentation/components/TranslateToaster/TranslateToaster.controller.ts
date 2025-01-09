interface HandleHotkeyProps {
  eventTarget: HTMLInputElement;
  isEditableElement: (element: HTMLElement) => boolean;
  text: string;
}

export const handleHotkey = async ({
  eventTarget,
  isEditableElement,
  text,
}: HandleHotkeyProps) => {
  try {
    if (!isEditableElement(eventTarget)) return;
    if (!text) return;
    eventTarget.value = text;
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};
