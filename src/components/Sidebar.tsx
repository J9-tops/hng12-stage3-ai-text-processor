import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { TMenuProps } from "../types";
import Button from "./Button";
import PreviousChat from "./PreviousChat";
import logo from "/Logo.png";

const Sidebar = ({ openMenu, toggleMenu }: TMenuProps) => {
  return (
    <aside
      className={`sidebar mdlg:relative mdlg:left-0 mdlg:block mdlg:w-full absolute top-0 z-50 flex h-screen w-screen ${openMenu ? "left-0" : "-left-full"}`}
    >
      <nav className="bg-greyish2 border-greyish3 mdlg:w-full h-full w-[80%] border-r border-solid">
        <header className="border-greyish3 mdlg:h-[80px] flex items-center justify-between border-b border-solid px-6 py-4">
          <Link to="/" className="mdlg:hidden">
            <img src={logo} alt="slothGPT logo" className="h-[38px]" />
          </Link>
          <Button className="mdlg:ml-auto text-2xl">
            <MdOpenInNew />
          </Button>
        </header>
        <div className="flex w-full flex-col px-3 py-2">
          <h1 className="w-full px-6 text-2xl font-bold">Today</h1>
          <PreviousChat text="How to be a better person?" link="#" />
        </div>
      </nav>

      <div
        className="mdlg:hidden w-[20%] bg-transparent backdrop-blur-[2px]"
        onClick={toggleMenu}
      ></div>
    </aside>
  );
};

export default Sidebar;
