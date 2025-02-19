import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="main flex h-[calc(100vh-80px)] max-h-screen flex-1 flex-col md:w-full">
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="shrink-0">
        <Input />
      </div>
    </main>
  );
};

export default ChatLayout;
