export interface Translate {
  text: string;
  target: string;
  source?: string;
}

export interface TranslateServiceProps {
  api_key: string;
}

export interface DetectLangProps {
  text: string;
}
