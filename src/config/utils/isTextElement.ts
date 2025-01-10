const elements: string[] = ["input", "textarea"];

export const isEditableElement = (element: HTMLElement): boolean => {
  try {
    const nodeName = element.nodeName.toLowerCase();
    return elements.includes(nodeName);
  } catch (error) {
    console.error("Error in isEditableElement:", error);
    return false;
  }
};

export const getEditableElements = (
  element: HTMLInputElement
): HTMLInputElement | undefined => {
  if (isEditableElement(element)) {
    return element;
  }

  const activeElement = document ? document.activeElement : null;
  if (activeElement && isEditableElement(activeElement as HTMLElement)) {
    return element;
  }
};
