import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addMessage,
  detectLanguage,
  summarizeText,
} from "../store/features/chatSlice";
import { AppDispatch } from "../store/store";

const useFormData = () => {
  const [message, setMessage] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(addMessage({ text: message, sender: "user" }));

    setTimeout(async () => {
      dispatch(detectLanguage(message));

      if (message.length > 150) {
        const result = await dispatch(summarizeText(message)).unwrap();
        dispatch(addMessage({ text: result, sender: "ai" }));
      } else {
        dispatch(addMessage({ text: message, sender: "ai" }));
      }
    }, 500);
    setMessage("");
  };

  return { handleSubmit, message, setMessage };
};

export default useFormData;
