export {};

declare global {
  interface Window {
    ai: {
      languageDetector: {
        capabilities: () => {
          available: "no" | "readily" | "after-download";
        };

        create: (options?: {
          monitor?: (m: EventTarget) => void;
        }) => Promise<LanguageDetectorInstance>;
      };
      translator: {
        capabilities: () => {
          available: "no" | "readily" | "after-download";
          languagePairAvailable: (
            sourceLang: string,
            targetLang: string,
          ) => "no" | "readily" | "after-download";
        };
        create: (options: {
          sourceLanguage: string;
          targetLanguage: string;
          monitor?: (m: EventTarget) => void;
        }) => Promise<TranslatorInstance>;
      };
      summarizer: {
        capabilities: () => {
          available: "no" | "readily" | "after-download";
        };
        create: (options?: {
          sharedContext?: string;
          type?: "tl;dr" | "key-points" | "headline" | "teaser";
          format?: "plain-text" | "markdown";
          length?: "short" | "medium" | "long";
          monitor?: (m: EventTarget) => void;
        }) => Promise<SummarizerInstance>;
      };
    };
  }
}

interface LanguageDetectorInstance {
  detect: (text: string) => Promise<DetectedLanguage[]>;
  ready?: Promise<void>;
}

interface TranslatorInstance {
  translate: (text: string) => Promise<string>;
  ready?: Promise<void>;
}

interface DetectedLanguage {
  detectedLanguage: string;
  confidence: number;
}

interface SummarizerInstance {
  summarize: (text: string) => Promise<string>;
  ready?: Promise<void>;
}

interface SummarizerCapabilities {
  available: "no" | "readily" | "after-download";
}

declare global {
  interface Window {
    translation: TranslationAPI;
  }
}
