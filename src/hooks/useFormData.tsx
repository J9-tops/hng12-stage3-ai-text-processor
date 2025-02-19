import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  detectLanguage,
  summarizeText,
  translateText,
} from "../store/features/chatSlice";
import { AppDispatch, RootState } from "../store/store";

const useFormData = (text: string = "") => {
  const [message, setMessage] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const translatedText = useSelector(
    (state: RootState) => state.chat.translatedText,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [sourceLanguage, setSourceLanguage] = useState<string>("en");
  const [originalText] = useState(text);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetLang = event.target.value;

    if (newTargetLang === selectedLanguage) return;

    setSourceLanguage(selectedLanguage);

    setSelectedLanguage(newTargetLang);

    dispatch(
      translateText({
        text: translatedText || originalText,
        sourceLang: selectedLanguage,
        targetLang: newTargetLang,
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(addMessage({ text: message, sender: "user" }));

    setTimeout(async () => {
      const detectedLang = await dispatch(detectLanguage(message)).unwrap();

      if (detectedLang && detectedLang.startsWith("Detected language: ")) {
        const langCode = detectedLang.split(": ")[1].split(" ")[0];
        setSourceLanguage(langCode);
      }

      if (message.length > 150) {
        const result = await dispatch(summarizeText(message)).unwrap();
        dispatch(addMessage({ text: result, sender: "ai" }));
      } else {
        dispatch(addMessage({ text: message, sender: "ai" }));
      }
    }, 500);
    setMessage("");
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
  };
};

export default useFormData;
