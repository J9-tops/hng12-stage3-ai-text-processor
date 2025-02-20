import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  title?: string;
  ariaLabel?: string;
};
const Button = ({
  children,
  className,
  onClick,
  type = "button",
  title,
  ariaLabel,
}: Props) => {
  return (
    <button
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
