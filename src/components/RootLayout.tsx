import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="max-w-[80rem] lg:mx-auto lg:border-r lg:border-l lg:border-solid lg:border-slate-500">
      <Header />
      <div className="flex lg:block">
        <Outlet />
      </div>
    </div>
  );

  // mx-auto hidden w-screen max-w-[80rem] flex-col overflow-hidden border-r border-l border-solid border-slate-500 bg-white shadow-2xl
};

export default RootLayout;
