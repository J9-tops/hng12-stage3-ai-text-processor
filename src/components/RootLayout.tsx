import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootLayout = () => {
  return (
    <div className="relative h-full max-w-[80rem] bg-white shadow-2xl lg:mx-auto lg:border-r lg:border-l lg:border-solid lg:border-slate-500">
      <Header />

      <Outlet />
    </div>
  );
};

export default RootLayout;
