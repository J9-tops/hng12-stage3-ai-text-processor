import Question from "./Question";
import Response from "./Response";

const ChatArea = () => {
  return (
    <div className="flex-1 px-5 py-4 md:h-full md:w-full">
      <Question text="what is a dog" />
      <Response text="it is an animal" />
    </div>
  );
};

export default ChatArea;
