import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "/Logo.png";
const Header = () => {
  return (
    <header className="border-greyish max-h-20 w-full border-b border-solid">
      <section className="border-greyish flex items-center justify-between border-0 border-b border-solid px-8 py-5">
        <Link to="/">
          <img src={logo} alt="slothGPT logo" className="h-[38px]" />
        </Link>

        <div>
          <RxAvatar className="text-3xl" />
        </div>
      </section>
    </header>
  );
};

export default Header;
