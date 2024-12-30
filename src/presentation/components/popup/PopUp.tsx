import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart } from "lucide-react";

import { EnableSwitch } from "..";

export const PopUp = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const languages = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
  ];

  return (
    <div className="w-64 p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Traductor</h2>
        <EnableSwitch />
      </div>

      <div className="space-y-2">
        <label htmlFor="#" className="text-sm font-medium">
          Traducir a:
        </label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un idioma" />
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
