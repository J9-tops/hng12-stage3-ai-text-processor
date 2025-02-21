import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Question from "./Question";
import Response from "./Response";

const ChatArea = () => {
  const { messages, loading } = useSelector((state: RootState) => state.chat);

  return (
    <section
      className="mdlg:w-full xxs:pt-[80px] xs:pb-[80px] h-[calc(100vh-60px-99px)] w-screen overflow-x-hidden overflow-y-auto px-5 py-4 md:pt-[90px] lg:pt-5 lg:pb-4"
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <p className="last-center text-2xl md:text-4xl">
            How can I assist you? 🤔
          </p>
          <p className="last-center w-90 text-lg md:w-130 md:text-2xl">
            Want a translation or a summary? Just enter your text, and I'll take
            care of the rest! I also detect languages.
          </p>
          <p className="last-center w-full text-center text-xl font-bold text-red-500">
            Please ensure you are using chrome browser!
          </p>
        </div>
      )}
    </section>
  );
};

export default ChatArea;
