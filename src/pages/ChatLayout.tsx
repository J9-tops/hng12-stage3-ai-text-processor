import { Outlet } from "react-router-dom";
import Input from "../components/Input";

const ChatLayout = () => {
  return (
    <main className="xs:h-[95%] xslg:h-full xsmd:h-auto mx-auto flex flex-col md:w-full">
      <div className="flex h-full overflow-y-auto">
        <Outlet />
      </div>
      <Input />
    </main>
  );
};

export default ChatLayout;
