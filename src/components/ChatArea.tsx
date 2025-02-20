import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Question from "./Question";
import Response from "./Response";

const ChatArea = () => {
  const { messages, loading } = useSelector((state: RootState) => state.chat);

  return (
    <div className="mdlg:w-full mdlg:h-[calc(100vh-80px-99px)] h-[calc(100vh-122px-99px)] flex-1 overflow-y-auto px-5 py-4">
      {messages.map((msg) =>
        msg.sender === "user" ? (
          <Question key={msg.id} text={msg.text} />
        ) : (
          <Response key={msg.id} text={msg.text} responseId={msg.id} />
        ),
      )}
      {loading && <Response text="Loading ..." responseId={0} />}
    </div>
  );
};

export default ChatArea;
