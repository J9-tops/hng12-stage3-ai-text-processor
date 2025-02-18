import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { TMenuProps } from "../types";
import Button from "./Button";
import PreviousChat from "./PreviousChat";
import logo from "/Logo.png";

const Sidebar = ({ openMenu, toggleMenu }: TMenuProps) => {
  console.log("openMenu", openMenu);
  return (
    <aside
      className={`sidebar absolute top-0 z-50 flex h-screen w-screen md:relative md:left-0 md:block md:w-full ${openMenu ? "left-0" : "-left-full"}`}
    >
      <nav className="bg-greyish2 border-greyish3 h-full w-[80%] border-r border-solid md:w-full">
        <header className="border-greyish3 flex items-center justify-between border-b border-solid px-6 py-4 md:h-[80px]">
          <Link to="/" className="md:hidden">
            <img src={logo} alt="slothGPT logo" className="h-[38px]" />
          </Link>
          <Button className="text-2xl md:ml-auto">
            <MdOpenInNew />
          </Button>
        </header>
        <div className="flex w-full flex-col px-3 py-2">
          <h1 className="w-full px-6 text-2xl font-bold">Today</h1>
          <PreviousChat text="How to be a better person?" link="#" />
        </div>
      </nav>

      <div
        className="w-[20%] bg-transparent backdrop-blur-[2px] md:hidden"
        onClick={toggleMenu}
      ></div>
    </aside>
  );
};

export default Sidebar;
