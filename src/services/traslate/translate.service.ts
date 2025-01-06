interface Translate {
  text: string;
  target: string;
  source?: string;
}

interface TranslateServiceProps {
  api_key: string;
}

export class TranslateService {
  api_key: string;

  constructor({ api_key }: TranslateServiceProps) {
    this.api_key = api_key;
  }

  async translate({ text, target }: Translate): Promise<string> {
    try {
      const urlServerTranslate = `https://translation.googleapis.com/language/translate/v2?key=${this.api_key}`;

      const response = await fetch(urlServerTranslate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target,
        }),
      });

      const jsonResponse = await response.json();

      console.log(jsonResponse);

      return jsonResponse.data.translations[0].translatedText;
    } catch (error) {
      console.log(error);
    }
    return "";
  }
}
