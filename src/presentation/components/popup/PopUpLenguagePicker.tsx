import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocalStorage, UseLocalStorageProps } from "@/hooks";
import { GotoTranslateData } from "..";

interface Props {
  labelText: string;
  selectPlaceholder: string;
  localStorageKey: string;
}

const languages = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
];

export const PopUpLenguagePicker = ({
  labelText,
  selectPlaceholder,
  localStorageKey,
}: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [isInitialized, setIsInitialized] = useState(false);
  const [customStorage] = useLocalStorage();

  const getStorageValue = useCallback(async () => {
    const data = await customStorage({
      op: "get",
      key: localStorageKey,
    });

    const dataReturn = data as GotoTranslateData;
    const dataString = data as string;

    return dataReturn.gotoTranslateActive || dataString;
  }, [customStorage, localStorageKey]);

  const setStorageValue = useCallback(
    async (value: string) => {
      const obj: UseLocalStorageProps = {
        op: "set",
        key: localStorageKey,
        data: value,
      };
      await customStorage(obj);
    },
    [customStorage, localStorageKey]
  );

  const onSelectLenguague = useCallback(
    async (value: string) => {
      setSelectedLanguage(value);

      setStorageValue(value);
      const updatedValue = await getStorageValue();

      console.log("Lenguague Switch: ", updatedValue);
    },
    [getStorageValue, setStorageValue]
  );

  const initializeLenguage = useCallback(async () => {
    if (isInitialized) return;

    const storedValue = await getStorageValue();
    setSelectedLanguage(storedValue);
    setIsInitialized(true);
  }, [getStorageValue, isInitialized, setSelectedLanguage, setIsInitialized]);

  useEffect(() => {
    initializeLenguage();
  }, [initializeLenguage]);

  return (
    <div className="space-y-2">
      <label htmlFor="#" className="text-sm font-medium">
        {labelText}
      </label>
      <Select value={selectedLanguage} onValueChange={onSelectLenguague}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={selectPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
