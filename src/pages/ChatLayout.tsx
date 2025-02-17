import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="flex flex-1 flex-col">
      <Outlet />
      <Input />
    </main>
  );
};

export default ChatLayout;
