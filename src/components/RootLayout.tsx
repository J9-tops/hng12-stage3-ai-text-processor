import { Outlet } from "react-router-dom";
import useMenu from "../hooks/useMenu";
import Header from "./Header";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const { openMenu, toggleMenu } = useMenu();
  return (
    <div className="grid-layout flex min-h-screen flex-col md:grid">
      <Header toggleMenu={toggleMenu} />
      <Sidebar openMenu={openMenu} toggleMenu={toggleMenu} />
      <Outlet />
    </div>
  );
};

export default RootLayout;
