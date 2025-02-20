import { IoTrashBinOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetChat } from "../store/features/chatSlice";
import { AppDispatch, RootState } from "../store/store";
import Button from "./Button";
import logo from "/Logo.png";
const Header = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch: AppDispatch = useDispatch();

  const deleteMessages = () => {
    dispatch(resetChat());
  };

  return (
    <header
      className="border-greyish max-h-20 w-full border-b border-solid"
      aria-label="bear ai header"
    >
      <section className="border-greyish flex items-center justify-between border-0 border-b border-solid px-8 py-5">
        <Link to="/">
          <img src={logo} alt="bear ai logo" className="h-[38px]" />
        </Link>
        {messages.length > 1 && (
          <Button
            className="text-2xl hover:text-red-500"
            title="Delete all messages"
            ariaLabel="delet all messages"
            onClick={deleteMessages}
          >
            <IoTrashBinOutline />
          </Button>
        )}
        <div aria-label="user icon">
          <RxAvatar className="cursor-pointer text-3xl" />
        </div>
      </section>
    </header>
  );
};

export default Header;
