import { useEffect, useCallback } from "react";

// Types for modifier keys
type ModifierKey = "ctrlKey" | "shiftKey" | "altKey" | "metaKey";

// Interface for hotkey configuration
interface HotkeyConfig {
  action: () => void;
  key?: string;
  modifiers?: ModifierKey[];
  preventDefault?: boolean;
}

// Type for multiple hotkey configurations
type HotkeyConfigs = HotkeyConfig[];

export const useHotkeyBind = (configs: HotkeyConfigs) => {
  // Function to check if all required modifier keys are pressed
  const checkModifiers = useCallback(
    (event: KeyboardEvent, modifiers?: ModifierKey[]): boolean => {
      if (!modifiers || modifiers.length === 0) {
        return (
          !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey
        );
      }

      const pressedModifiers = {
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
      };

      // Verify that only the specified modifier keys are pressed
      return Object.entries(pressedModifiers).every(([modifier, isPressed]) => {
        if (modifiers.includes(modifier as ModifierKey)) {
          return isPressed;
        }
        return !isPressed;
      });
    },
    []
  );

  // Keydown event handler
  const handleKeyDown = useCallback(
    (e: Event) => {
      const event = e as KeyboardEvent;
      configs.forEach(({ key, modifiers, action, preventDefault = false }) => {
        if (
          (key &&
            event.key.toLowerCase() === key.toLowerCase() &&
            checkModifiers(event, modifiers)) ||
          (!key && checkModifiers(event, modifiers))
        ) {
          if (preventDefault) event.preventDefault();
          action();
        }
      });
    },
    [configs, checkModifiers]
  );

  // Effect to add and remove the event listener
  useEffect(() => {
    const element = document.activeElement ?? document;

    element.addEventListener("keydown", handleKeyDown);
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
