export const SUPPORTED_LANGUAGES = ["en", "es", "pt", "ru", "tr", "fr"];

export type TSupportedLanguages = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGES: {
  identifier: TSupportedLanguages;
  name: string;
}[] = [
  { identifier: "en", name: "English" },
  { identifier: "es", name: "Spanish" },
  { identifier: "pt", name: "Portuguese" },
  { identifier: "ru", name: "Russian" },
  { identifier: "tr", name: "Turkish" },
  { identifier: "fr", name: "French" },
];
