import { useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useTextSelection } from "@/hooks/useTextSelection";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocalStorage } from "@/hooks";
import { GotoTranslateData } from "..";

interface TranslateToasterProps {
  targetLanguage?: string;
}

const STORAGE_KEY = "gotoTranslateActive";

export const TranslateToaster = ({
  targetLanguage = "en",
}: TranslateToasterProps) => {
  const selectedText = useTextSelection();
  const { translation, error } = useTranslation({
    text: selectedText,
    targetLang: targetLanguage,
  });
  const [customStorage] = useLocalStorage();

  const getStorageValue = useCallback(async () => {
    const data = (await customStorage({
      op: "get",
      key: STORAGE_KEY,
    })) as GotoTranslateData;

    return data?.gotoTranslateActive || data;
  }, [customStorage]);

  useEffect(() => {
    const translateText = async () => {
      const gotoIsActive = await getStorageValue();
      const isActive = gotoIsActive === "true";
      if (!isActive) return;
      if (error) {
        toast({
          title: "Translation Error",
          description: error.message,
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if (translation) {
        toast({
          title: translation,
          duration: 15000,
        });
      }
    };
    translateText();
  }, [translation, error, getStorageValue]);

  return <Toaster />;
};
