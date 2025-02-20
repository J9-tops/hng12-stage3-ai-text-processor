import { IoIosSend } from "react-icons/io";
import useFormData from "../hooks/useFormData";
import Button from "./Button";

const Input = () => {
  const { handleSubmit, setMessage, message } = useFormData();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-greyish3 relative flex w-full border-t border-solid px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <textarea
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your text ..."
        className="border-greyish3 w-full rounded-2xl border border-solid p-2 pr-13 shadow-lg"
        onKeyDown={handleKeyDown}
      />
      <Button
        type="submit"
        className="bg-greyish3 absolute top-1/2 right-8 -translate-y-1/2 transform rounded-4xl p-2 text-2xl"
      >
        <IoIosSend />
      </Button>
    </form>
  );
};

export default Input;
