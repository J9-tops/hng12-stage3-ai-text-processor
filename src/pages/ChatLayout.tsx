import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="main mdlg:h-[calc(100vh-80px)] flex h-[calc(100vh-56px)] flex-1 flex-col md:w-full">
      <Outlet />
      <Input />
    </main>
  );
};

export default ChatLayout;
