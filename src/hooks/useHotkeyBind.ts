import { useEffect, useCallback } from "react";

// Types for modifier keys
type ModifierKey = "ctrlKey" | "shiftKey" | "altKey" | "metaKey";

// Interface for hotkey configuration
interface HotkeyConfig {
  key: string;
  action: () => void;
  modifiers?: ModifierKey[];
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
    (event: KeyboardEvent) => {
      configs.forEach(({ key, modifiers, action }) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          checkModifiers(event, modifiers)
        ) {
          event.preventDefault();
          action();
        }
      });
    },
    [configs, checkModifiers]
  );

  // Effect to add and remove the event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
