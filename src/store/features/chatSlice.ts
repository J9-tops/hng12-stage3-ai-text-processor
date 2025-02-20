import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSummarizerOptions, TTranslatorOptions } from "../../types";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
  language?: string;
};

type TChat = Omit<Message, "id">;

type ChatState = {
  messages: Message[];
  loading: boolean;
  error?: string;
  language: string;
  submittedMessage: string;
  summarizedText?: string;
  chosenTranslate: boolean;
};

const initialState: ChatState = {
  messages: [],
  summarizedText: "",
  error: "",
  language: "en",
  submittedMessage: "",
  loading: false,
  chosenTranslate: false,
};

export const detectLanguage = createAsyncThunk(
  "chat/detectLanguage",
  async (text: string, { rejectWithValue }) => {
    try {
      if (!("ai" in self) || !("languageDetector" in self.ai)) {
        return rejectWithValue("Language detection not supported");
      }

      const capabilities = await self.ai.languageDetector.capabilities();
      if (capabilities.available === "no") {
        return rejectWithValue("Language detection unavailable");
      }

      let detector;
      if (capabilities.available === "readily") {
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              const progressEvent = e as ProgressEvent;
              console.log(
                `Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`,
              );
            });
          },
        });
        await detector.ready;
      }

      const results = await detector.detect(text);
      if (results.length === 0) {
        return rejectWithValue("No language detected");
      }

      const { detectedLanguage, confidence } = results[0];
      return `Detected language: ${detectedLanguage} (Confidence: ${(
        confidence * 100
      ).toFixed(2)}%)`;
    } catch (error) {
      console.error("Language detection error:", error);
      return rejectWithValue("Error detecting language");
    }
  },
);

export const summarizeText = createAsyncThunk(
  "chat/summarizeText",
  async (text: string, { rejectWithValue }) => {
    try {
      if (!("ai" in self) || !("summarizer" in self.ai)) {
        return rejectWithValue("Summarizer not supported");
      }

      const capabilities = await self.ai.summarizer.capabilities();
      if (capabilities.available === "no") {
        return rejectWithValue("Summarizer unavailable");
      }

      const options: TSummarizerOptions = {
        sharedContext: "This is a random text",
        type: "key-points",
        format: "plain-text",
        length: "medium",
      };

      let summarizer;
      if (capabilities.available === "readily") {
        summarizer = await self.ai.summarizer.create(options);
      } else {
        summarizer = await self.ai.summarizer.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              const progressEvent = e as ProgressEvent;
              console.log(
                `Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`,
              );
            });
          },
        });
        await summarizer.ready;
      }

      const result = await summarizer.summarize(text, {
        context: "This is a random text",
      });
      return result;
    } catch (error) {
      console.error("Summarization error:", error);
      return rejectWithValue("Error summarizing text");
    }
  },
);

export const translateText = createAsyncThunk(
  "chat/translateText",
  async (
    { text, sourceLang, targetLang }: TTranslatorOptions,
    { rejectWithValue },
  ) => {
    if (!("ai" in self) || !("translator" in self.ai)) {
      return rejectWithValue("Translator not supported");
    }

    try {
      const capabilities = await self.ai.translator.capabilities();
      const availability = capabilities.languagePairAvailable(
        sourceLang,
        targetLang,
      );
      if (availability === "no") {
        return rejectWithValue(
          "Translation not available for this language pair",
        );
      }

      if (capabilities.available === "no") {
        return rejectWithValue(
          "Translation unavailable for the selected languages",
        );
      }

      let translator;
      if (availability === "readily") {
        translator = await self.ai.translator.create({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        });
      } else {
        translator = await self.ai.translator.create({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              const progressEvent = e as ProgressEvent;
              console.log(
                `Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`,
              );
            });
          },
        });
        await translator.ready;
      }

      const translatedText = await translator.translate(text);
      return { translatedText, targetLang };
    } catch (error) {
      console.error("Translation error:", error);
      return rejectWithValue("Error translating text");
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<TChat>) => {
      state.messages.push({
        id: state.messages.length + 1,
        text: action.payload.text,
        sender: action.payload.sender,
        language: action.payload.language,
      });
    },
    resetChat: (state) => {
      state.messages = [];
      state.submittedMessage = "";
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    resetTranslation: (state) => {
      state.language = "en";
      state.summarizedText = "";
      state.error = "";
    },
    updateSubmittedMessage: (state, action) => {
      state.submittedMessage = action.payload;
    },
    toggleTranslate: (state, action) => {
      state.chosenTranslate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(detectLanguage.fulfilled, (state, action) => {
        const detectedLangText = action.payload;
        let langCode = "unknown";

        if (
          typeof detectedLangText === "string" &&
          detectedLangText.includes(": ")
        ) {
          const parts = detectedLangText.split(": ");
          if (parts.length > 1 && parts[1].includes(" ")) {
            langCode = parts[1].split(" ")[0];
          }
        }
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          text: detectedLangText,
          sender: "ai",
          language: langCode,
        });
      })
      .addCase(detectLanguage.rejected, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          text: action.payload as string,
          sender: "ai",
        });
      })
      .addCase(summarizeText.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(summarizeText.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          text: action.payload,
          sender: "ai",
          language: "",
        });
      })
      .addCase(summarizeText.rejected, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          text: action.payload as string,
          sender: "ai",
        });
        state.error = action.payload as string;
      })
      .addCase(translateText.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(translateText.fulfilled, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "object" && action.payload !== null) {
          state.messages.push({
            id: state.messages.length + 1,
            text:
              "translatedText" in action.payload
                ? action.payload.translatedText
                : "",
            sender: "ai",
            language:
              "targetLang" in action.payload ? action.payload.targetLang : "",
          });
        }
      })
      .addCase(translateText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.messages.push({
          id: state.messages.length + 1,
          text: action.payload as string,
          sender: "ai",
        });
      });
  },
});

export const {
  addMessage,
  setSelectedLanguage,
  resetTranslation,
  updateSubmittedMessage,
  toggleTranslate,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
