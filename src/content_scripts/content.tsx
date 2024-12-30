import { useLocalStorage } from "../hooks";

import type { GotoTranslateData } from "@/presentation/components";

const STORAGE_KEY = "gotoTranslateActive";

(async () => {
  const [customStorage] = useLocalStorage();
  const isActive = (await customStorage({
    op: "get",
    key: STORAGE_KEY,
  })) as GotoTranslateData;
  console.log(isActive);
  if (isActive.gotoTranslateActive === "true") console.log("verga ", isActive);
})();
