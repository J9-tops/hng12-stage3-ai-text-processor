import { useState } from "react";

const useMenu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return { openMenu, toggleMenu };
};

export default useMenu;
