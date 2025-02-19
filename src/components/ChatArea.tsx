import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Question from "./Question";
import Response from "./Response";

const ChatArea = () => {
  const { messages, loading } = useSelector((state: RootState) => state.chat);
  return (
    <div className="mdlg:h-full mdlg:w-full flex-1 px-5 py-4">
      {messages.map((msg) =>
        msg.sender === "user" ? (
          <Question key={msg.id} text={msg.text} />
        ) : (
          <Response key={msg.id} text={msg.text} />
        ),
      )}
      {loading && <Response text="Detecting language..." />}
    </div>
  );
};

export default ChatArea;
