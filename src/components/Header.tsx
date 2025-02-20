import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "/Logo.png";
const Header = () => {
  return (
    <header className="mdlg:border-greyish mdlg:max-h-20 mdlg:w-full mdlg:border-b mdlg:border-solid max-h-[184px]">
      <section className="border-greyish mdlg:flex mdlg:border-0 hidden items-center justify-between border-b border-solid px-8 py-5">
        <Link to="/">
          <img src={logo} alt="slothGPT logo" className="h-[38px]" />
        </Link>

        <div>
          <RxAvatar className="text-3xl" />
        </div>
      </section>
      <section className="border-greyish mdlg:hidden flex items-center justify-between border-b border-solid p-4">
        <Link to="/">
          <img src={logo} alt="slothGPT logo" className="h-8" />
        </Link>
      </section>
    </header>
  );
};

export default Header;
