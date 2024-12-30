import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks";

export const EnableSwitch = () => {
  const [isActive, setIsActive] = useState(false);
  const [customStorage] = useLocalStorage();

  const handleToggle = async () => {
    setIsActive(!isActive);
    await customStorage({
      op: "set",
      key: "gotoTranslateActive",
      data: isActive.toString(),
    });
    const data = await customStorage({
      op: "get",
      key: "gotoTranslateActive",
    });

    console.log(`Enable Switch:`, data);
  };

  return (
    <Switch
      checked={isActive}
      onCheckedChange={handleToggle}
      className="ml-2"
    />
  );
};
