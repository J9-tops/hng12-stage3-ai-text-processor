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
      className="border-greyish xsmd:sticky xs:fixed top-0 z-50 max-h-15 w-full border-b border-solid bg-white shadow-lg"
      aria-label="bear ai header"
    >
      <section className="flex items-center justify-between px-8 py-3">
        <Link to="/">
          <img
            src={logo}
            alt="bear ai logo"
            className="mdlg:h-[38px] h-[30px]"
          />
        </Link>
        {messages.length > 1 && (
          <Button
            className="xs:absolute xs:top-30 z-50 text-2xl hover:text-red-500 lg:relative lg:top-0"
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
