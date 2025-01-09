const elements: string[] = ["input", "textarea"];

export const isEditableElement = (element: HTMLElement): boolean => {
  const nodeName = element.nodeName.toLowerCase();
  return elements.includes(nodeName);
};
