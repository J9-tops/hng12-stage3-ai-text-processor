import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="root-layout mx-auto flex w-screen max-w-[80rem] flex-col overflow-hidden border-r border-l border-solid border-slate-500 bg-white shadow-2xl">
      <Header />
      <div className="flex lg:block">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
