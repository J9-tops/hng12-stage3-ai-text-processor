import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="mx-auto flex flex-col md:w-full lg:h-auto">
      <div className="flex h-full overflow-y-auto">
        <Outlet />
      </div>
      <Input />
    </main>
  );
};

export default ChatLayout;
