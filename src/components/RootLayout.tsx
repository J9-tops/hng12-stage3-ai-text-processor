import { Outlet } from "react-router-dom";
import useMenu from "../hooks/useMenu";
import Header from "./Header";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const { openMenu, toggleMenu } = useMenu();
  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleMenu={toggleMenu} />
      <Sidebar openMenu={openMenu} toggleMenu={toggleMenu} />
      <Outlet />
    </div>
  );
};

export default RootLayout;
