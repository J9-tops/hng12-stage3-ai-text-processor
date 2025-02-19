import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSummarizerOptions, TTranslatorOptions } from "../../types";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

type TChat = Omit<Message, "id">;

type ChatState = {
  messages: Message[];
  summarizedText?: string;
  loading: boolean;
  error?: string;
  translatedText?: string;
};

const initialState: ChatState = {
  messages: [],
  summarizedText: "",
  translatedText: "",
  error: "",
  loading: false,
};

export const detectLanguage = createAsyncThunk(
  "chat/detectLanguage",
  async (text: string) => {
    try {
      if (!("ai" in self) || !("languageDetector" in self.ai)) {
        return "Language detection not supported";
      }

      const capabilities = await self.ai.languageDetector.capabilities();
      if (capabilities.available === "no") {
        return "Language detection unavailable";
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
        return "No language detected";
      }

      const { detectedLanguage, confidence } = results[0];
      return `Detected language: ${detectedLanguage} (Confidence: ${(
        confidence * 100
      ).toFixed(2)}%)`;
    } catch (error) {
      console.error("Language detection error:", error);
      return "Error detecting language";
    }
  },
);

export const summarizeText = createAsyncThunk(
  "chat/summarizeText",
  async (text: string, { rejectWithValue }) => {
    if (text.length <= 150) return text;

    try {
      if (!("ai" in self) || !("summarizer" in self.ai)) {
        return "Summarizer not supported";
      }

      const capabilities = await self.ai.summarizer.capabilities();
      if (capabilities.available === "no") {
        return "Summarizer unavailable";
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

      const results = await summarizer.summarize(text);
      return results;
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
    console.log("text. source target", text, sourceLang, targetLang);
    if (!("ai" in self) || !("translator" in self.ai)) {
      return "Translator not supported";
    }

    if (sourceLang === targetLang) {
      return resetTranslation();
    }

    try {
      const capabilities = await self.ai.translator.capabilities();
      const availability = capabilities.languagePairAvailable(
        sourceLang,
        targetLang,
      );

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
      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return rejectWithValue("Error summarizing text");
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
      });
    },
    resetTranslation: (state) => {
      state.translatedText = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectLanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(detectLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          text: action.payload,
          sender: "ai",
        });
      })
      .addCase(detectLanguage.rejected, (state) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          text: "Error detecting language",
          sender: "ai",
        });
      })
      .addCase(summarizeText.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        summarizeText.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.summarizedText = action.payload ?? "";
        },
      )
      .addCase(summarizeText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(translateText.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        translateText.fulfilled,
        (
          state,
          action: PayloadAction<
            string | { payload: undefined; type: "chat/resetTranslation" }
          >,
        ) => {
          state.loading = false;
          if (typeof action.payload === "string") {
            state.messages.push({
              id: state.messages.length + 1,
              text: action.payload,
              sender: "ai",
            });
          } else {
            state.translatedText = "";
          }
        },
      )
      .addCase(translateText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, resetTranslation } = chatSlice.actions;
export default chatSlice.reducer;
