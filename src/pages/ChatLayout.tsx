import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="main flex flex-1 flex-col md:w-full">
      <Outlet />
      <Input />
    </main>
  );
};

export default ChatLayout;
