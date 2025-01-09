interface HandleHotkeyProps {
  eventTarget: HTMLInputElement;
  isEditableElement: (element: HTMLElement) => boolean;
}

export const handleHotkey = ({
  eventTarget,
  isEditableElement,
}: HandleHotkeyProps) => {
  try {
    if (!isEditableElement(eventTarget)) return;
    eventTarget.value = "azucar con pan";
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};
