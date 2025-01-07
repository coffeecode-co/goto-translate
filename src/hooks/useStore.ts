import { create } from "zustand";

interface State {
  selectedText: string;
  translatedText: string;
}

interface Actions {
  setSelectedText: (text: string) => void;
  setTranslatedText: (text: string) => void;
}

export const useTranslateStore = create<State & Actions>((set) => ({
  selectedText: "",
  translatedText: "",
  setSelectedText: (text: string) => set({ selectedText: text }),
  setTranslatedText: (text: string) => set({ translatedText: text }),
}));
