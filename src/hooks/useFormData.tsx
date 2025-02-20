import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  detectLanguage,
  resetTranslation,
  summarizeText,
  translateText,
  updateSubmittedMessage,
} from "../store/features/chatSlice";
import { AppDispatch, RootState } from "../store/store";

const useFormData = (text: string = "", responseId: number = 0) => {
  const [message, setMessage] = useState("");

  const [sourceLanguage, setSourceLanguage] = useState<string>("en");
  const [originalText, setOriginalText] = useState<string>(text);
  const [translatedText, setTranslatedText] = useState("");

  const messages = useSelector((state: RootState) => state.chat.messages);
  const submittedMessage = useSelector(
    (state: RootState) => state.chat.submittedMessage,
  );

  const response = messages.find((msg) => msg.id === responseId);
  const [selectedLanguage, setSelectedLanguage] = useState(
    response?.language ?? "en",
  );

  const dispatch: AppDispatch = useDispatch();
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newTargetLang = event.target.value;

    setSourceLanguage(selectedLanguage);

    setSelectedLanguage(newTargetLang);

    setTranslatedText("");

    dispatch(
      translateText({
        text: submittedMessage,
        sourceLang: selectedLanguage,
        targetLang: newTargetLang,
      }),
    ).then((result) => {
      dispatch(
        addMessage({
          text: result.payload as string,
          sender: "ai",
          language: selectedLanguage,
        }),
      );
    });
  };

  const handleSummarize = () => {
    setTimeout(async () => {
      await dispatch(summarizeText(message)).then((result) =>
        dispatch(
          addMessage({
            text: result.payload as string,
            sender: "ai",
            language: selectedLanguage,
          }),
        ),
      );
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!message.trim()) return;
    let langCode = "en";

    dispatch(updateSubmittedMessage(message));

    setOriginalText(message);
    setTranslatedText("");
    setSourceLanguage("en");
    setSelectedLanguage("en");

    dispatch(resetTranslation());

    dispatch(addMessage({ text: message, sender: "user" }));

    setTimeout(async () => {
      const detectedLang = await dispatch(detectLanguage(message)).unwrap();

      if (detectedLang && detectedLang.startsWith("Detected language: ")) {
        langCode = detectedLang.split(": ")[1].split(" ")[0];
        setSourceLanguage(langCode);
      }

      dispatch(addMessage({ text: message, sender: "ai", language: langCode }));
    }, 500);
  };

  return {
    handleSubmit,
    message,
    setMessage,
    handleLanguageChange,
    originalText,
    translatedText,
    selectedLanguage,
    sourceLanguage,
    handleSummarize,
  };
};

export default useFormData;
