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
        capabilities: () => Promise<{
          languagePairAvailable: (source: string, target: string) => boolean;
        }>;
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

interface DetectedLanguage {
  detectedLanguage: string;
  confidence: number; // 0.0 - 1.0
}

interface TranslationAPI {
  canTranslate: (options: {
    sourceLanguage: string;
    targetLanguage: string;
  }) => Promise<void>;
  translate: (options: {
    sourceLanguage: string;
    targetLanguage: string;
    text: string;
  }) => Promise<string>;
  downloadprogress: {
    addEventListener: (
      event: string,
      callback: (event: ProgressEvent) => void,
    ) => void;
  };
  capabilities: () => Promise<void>;
  createTranslator: (options: {
    sourceLanguage: string;
    targetLanguage: string;
    monitor?: (m: EventTarget) => void;
  }) => Promise<{
    translate: (text: string) => Promise<string>;
  }>;
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
