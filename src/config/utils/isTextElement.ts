export const isEditableElement = (element: HTMLElement): boolean => {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element.isContentEditable
  );
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
