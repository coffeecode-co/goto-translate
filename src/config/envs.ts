import { z } from "zod";

const envsSchema = z.object({
  VITE_GOOGLE_CLOUD_TRANSLATE_KEY: z.string(),
  VITE_TRANSLATION_ENABLED: z.preprocess((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }, z.boolean()),
});

const parseEnv = () => {
  const parsed = envsSchema.safeParse({
    VITE_GOOGLE_CLOUD_TRANSLATE_KEY: import.meta.env
      .VITE_GOOGLE_CLOUD_TRANSLATE_KEY,
    VITE_TRANSLATION_ENABLED: import.meta.env.VITE_TRANSLATION_ENABLED,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
  });

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.toString());
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
};

export const envs = parseEnv();
