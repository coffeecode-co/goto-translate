import { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks";

import type { UseLocalStorageProps } from "@/hooks";

export interface GotoTranslateData {
  gotoTranslateActive: string;
  gotoTargetLanguage: string;
  gotoNativeLanguage: string;
}

const STORAGE_KEY = "gotoTranslateActive";

export const EnableSwitch = () => {
  const [isActive, setIsActive] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [customStorage] = useLocalStorage();

  const getStorageValue = useCallback(async () => {
    const data = (await customStorage({
      op: "get",
      key: STORAGE_KEY,
    })) as GotoTranslateData;

    return data?.gotoTranslateActive || data;
  }, [customStorage]);

  const setStorageValue = useCallback(
    async (value: string) => {
      const obj: UseLocalStorageProps = {
        op: "set",
        key: STORAGE_KEY,
        data: value,
      };
      await customStorage(obj);
    },
    [customStorage]
  );

  const handleToggle = useCallback(async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    await setStorageValue(newStatus.toString());
    const updatedValue = await getStorageValue();

    console.log("Enable Switch:", updatedValue);
  }, [isActive, getStorageValue, setStorageValue]);

  const initializeSwitch = useCallback(async () => {
    if (isInitialized) return;

    const storedValue = await getStorageValue();
    setIsActive(storedValue === "true");
    setIsInitialized(true);
  }, [getStorageValue, isInitialized]);

  useEffect(() => {
    initializeSwitch();
  }, [initializeSwitch]);

  if (!isInitialized) {
    return null;
  }

  return (
    <Switch
      checked={isActive}
      onCheckedChange={handleToggle}
      className="ml-2"
    />
  );
};
