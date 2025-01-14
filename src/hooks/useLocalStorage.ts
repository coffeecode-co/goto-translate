export interface UseLocalStorageProps {
  op: "set" | "get" | "remove" | "clear";
  key?: string;
  data?: string;
}

export const useLocalStorage = () => {
  if (!chrome.storage) {
    return [operateLocalStorage];
  }

  return [operateChromeStorage];
};

const operateLocalStorage = (props: UseLocalStorageProps) => {
  const { op, key, data } = props;

  switch (op) {
    case "get":
      if (!key) return;
      return localStorage.getItem(key);
    case "set":
      if (!key || !data) return;
      localStorage.setItem(key, data);
      break;
    case "remove":
      if (!key) return;
      localStorage.removeItem(key);
      break;
    case "clear":
      localStorage.clear();
      break;
    default:
      throw new Error("Unsupported operation");
  }
};

const operateChromeStorage = async (props: UseLocalStorageProps) => {
  const { op, key, data } = props;
  let localData: { [key: string]: string } = {};
  switch (op) {
    case "get":
      if (!key) return;
      localData = await chrome.storage.local.get(key);
      return localData[key];
    case "set":
      if (!key || !data) return;
      await chrome.storage.local.set({ [key]: data });
      break;
    case "remove":
      if (!key) return;
      await chrome.storage.local.remove(key);
      break;
    case "clear":
      await chrome.storage.local.clear();
      break;
    default:
      throw new Error("Unsupported operation");
  }
};
