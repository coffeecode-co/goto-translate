interface HandleHotkeyProps {
  eventTarget: HTMLInputElement;
  isEditableElement: (element: HTMLElement) => boolean;
}

interface ForcePasteProps {
  text: string;
  targetElement: HTMLInputElement | HTMLTextAreaElement;
}

export const handleHotkey = async ({
  eventTarget,
  isEditableElement,
}: HandleHotkeyProps) => {
  try {
    if (!isEditableElement(eventTarget)) return;
    forcePaste({ text: "pinche azucar", targetElement: eventTarget });
  } catch (error) {
    console.error("Error handling hotkey:", error);
  }
};

export const forcePaste = async ({ text, targetElement }: ForcePasteProps) => {
  try {
    const item = new ClipboardItem({
      "text/plain": new Blob([text], { type: "text/plain" }),
    });

    await navigator.clipboard.write([item]);

    targetElement.focus();
    await navigator.clipboard.readText().then((text) => {
      targetElement.value = text;

      // Disparar el evento paste
      const pasteEvent = new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true,
        clipboardData: new DataTransfer(),
      });

      targetElement.dispatchEvent(pasteEvent);
    });
  } catch (err) {
    console.error("Error al realizar el paste:", err);
  }
};
