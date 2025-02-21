import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="h-full max-w-[80rem] lg:mx-auto lg:border-r lg:border-l lg:border-solid lg:border-green-500">
      <Header />

      <Outlet />
    </div>
  );

  // mx-auto hidden w-screen max-w-[80rem] flex-col overflow-hidden border-r border-l border-solid border-slate-500 bg-white shadow-2xl
};

export default RootLayout;
