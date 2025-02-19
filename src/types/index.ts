import { createContext } from "react";

export type TMenuProps = {
  openMenu?: boolean;
  toggleMenu?: () => void;
};

export type AIFeatures = {
  detectLanguage: (text: string) => Promise<string>;
  translate: (text: string, targetLang: string) => Promise<string>;
  summarize: (text: string) => Promise<string>;
} | null;

export const AIContext = createContext<AIFeatures>(null);

export type TTranslation = {
  canTranslate: () => boolean;
  createTranslator: () => unknown;
};

export type TTranslatorType = {
  translate: (text: string) => Promise<string>;
};

export type TSummarizerOptions = {
  sharedContext?: string;
  type?: "tl;dr" | "key-points" | "headline" | "teaser";
  format?: "plain-text" | "markdown";
  length?: "short" | "medium" | "long";
};
