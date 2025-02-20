import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Question from "./Question";
import Response from "./Response";

const ChatArea = () => {
  const { messages, loading } = useSelector((state: RootState) => state.chat);

  return (
    <section
      className="mdlg:w-full h-[calc(100vh-60px-99px)] overflow-y-auto px-5 py-4"
      aria-labelledby="chat area"
      tabIndex={0}
      role="region"
    >
      {messages.map((msg) =>
        msg.sender === "user" ? (
          <Question key={msg.id} text={msg.text} />
        ) : (
          <Response key={msg.id} text={msg.text} responseId={msg.id} />
        ),
      )}
      {loading && <Response text="Loading ..." responseId={0} />}
      {messages.length < 1 && (
        <div>
          BearAi helps in translating, detection of language, and summarization
          of text
        </div>
      )}
    </section>
  );
};

export default ChatArea;
