import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useTextSelection } from "@/hooks/useTextSelection";
import { useTranslation } from "@/hooks/useTranslation";

interface TranslateToasterProps {
  targetLanguage?: string;
}

export const TranslateToaster = ({
  targetLanguage = "en",
}: TranslateToasterProps) => {
  const selectedText = useTextSelection();
  const { translation, error } = useTranslation({
    text: selectedText,
    targetLang: targetLanguage,
  });

  useEffect(() => {
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
  }, [translation, error]);

  return <Toaster />;
};
