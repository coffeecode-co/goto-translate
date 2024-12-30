import { useLocalStorage } from "./hooks";

const STORAGE_KEY = "gotoTranslateActive";

(async () => {
  const [customStorage] = useLocalStorage();
  const isActive = await customStorage({
    op: "get",
    key: STORAGE_KEY,
  });
  console.log(isActive);
  if (isActive.gotoTranslateActive === "true") console.log("verga ", isActive);
})();
