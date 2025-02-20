import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="main mdlg:h-[calc(100vh-80px)] flex h-[calc(100vh-71px)] flex-1 flex-col md:w-full">
      <div className="flex-1">
        <Outlet />
      </div>
      <Input />
    </main>
  );
};

export default ChatLayout;
