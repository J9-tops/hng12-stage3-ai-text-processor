import { IoMoonSharp } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { TMenuProps } from "../types";
import Button from "./Button";
import logo from "/Logo.png";
const Header = ({ toggleMenu }: TMenuProps) => {
  return (
    <header className="header md:border-greyish max-h-[184px] md:max-h-20 md:w-full md:border-b md:border-solid">
      <section className="border-greyish hidden items-center justify-between border-b border-solid px-8 py-5 md:flex md:border-0">
        <Link to="/">
          <img src={logo} alt="slothGPT logo" className="h-[38px]" />
        </Link>
        <div className="flex gap-3">
          <Button>
            <MdOutlineWbSunny />
          </Button>
          <Button>
            <IoMoonSharp />
          </Button>
        </div>
        <div>
          <RxAvatar className="text-3xl" />
        </div>
      </section>
      <section className="border-greyish flex items-center justify-between border-b border-solid p-4 md:hidden">
        <Link to="/">
          <img src={logo} alt="slothGPT logo" className="h-8" />
        </Link>
        <Button onClick={toggleMenu}>
          <RxHamburgerMenu />
        </Button>
      </section>
      <section className="border-greyish flex items-center justify-between border-b border-solid px-4 py-5 md:hidden">
        <div className="flex gap-2">
          <Button>
            <MdOutlineWbSunny />
          </Button>
          <Button>
            <IoMoonSharp />
          </Button>
        </div>
        <div>
          <RxAvatar />
        </div>
      </section>
    </header>
  );
};

export default Header;
