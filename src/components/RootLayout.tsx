import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="mx-auto flex h-screen max-w-[80rem] flex-col border-r border-l border-solid border-slate-500 shadow-2xl">
      <Header />
      <div className="flex flex-1 lg:block">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
