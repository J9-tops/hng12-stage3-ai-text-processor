export const LANGUAGES = [
  { id: "english", label: "English", value: "en" },
  { id: "portuguese", label: "Portuguese", value: "pt" },
  { id: "spanish", label: "Spanish", value: "es" },
  { id: "russian", label: "Russian", value: "ru" },
  { id: "turkish", label: "Turkish", value: "tr" },
  { id: "french", label: "French", value: "fr" },
];

const languageMap: Record<string, string> = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
};

export const formatDetectedLanguage = (text: string) => {
  const match = text.match(/Detected language: (\w+)/i);
  if (match) {
    const languageCode = match[1];
    return `Detected language: ${languageMap[languageCode] || languageCode}`;
  }
  return text;
};

export function getLanguageName(code: string): string {
  return languageMap[code] || "Unknown Language";
}
