import { Button } from "@/components/ui/button";

import { Heart } from "lucide-react";

import { EnableSwitch } from "..";
import { PopUpLenguagePicker } from "./PopUpLenguagePicker";
import { GLOBAL_STRINGS } from "@/config";

export const PopUp = () => {
  return (
    <div className="w-64 p-4 space-y-4 h-96 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Traductor</h2>
        <EnableSwitch />
      </div>

      <PopUpLenguagePicker
        labelText={GLOBAL_STRINGS.POPUP_PICKERS.NATIVE_LANGUAGE.LABEL}
        localStorageKey={GLOBAL_STRINGS.LOCAL_STORAGE_KEY.NATIVE_LENGUAGE}
        selectPlaceholder={
          GLOBAL_STRINGS.POPUP_PICKERS.NATIVE_LANGUAGE.PLACEHOLDER
        }
      />

      <PopUpLenguagePicker
        labelText={GLOBAL_STRINGS.POPUP_PICKERS.TARGET_LANGUAGE.LABEL}
        localStorageKey={GLOBAL_STRINGS.LOCAL_STORAGE_KEY.TARGET_LENGUAGE}
        selectPlaceholder={
          GLOBAL_STRINGS.POPUP_PICKERS.TARGET_LANGUAGE.PLACEHOLDER
        }
      />

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() =>
          window.open("https://buymeacoffee.com/juanleon", "_blank")
        }
      >
        <Heart className="w-4 h-4" />
        Donar
      </Button>
    </div>
  );
};
