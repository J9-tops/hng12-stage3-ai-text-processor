import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="mx-auto flex w-[95%] flex-col md:w-full">
      <div className="flex flex-1 overflow-y-auto lg:h-full lg:flex-auto">
        <Outlet />
      </div>
      <Input />
    </main>
  );
};

export default ChatLayout;
