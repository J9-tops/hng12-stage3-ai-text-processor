import { Link } from "react-router-dom";

type Props = {
  link: string;
  text: string;
};

const PreviousChat = ({ link, text }: Props) => {
  return (
    <Link
      to={link}
      className="bg-greyish3 mt-2 h-12 w-full overflow-hidden rounded-xl px-6 py-3 overflow-ellipsis whitespace-nowrap"
    >
      <span>{text}</span>
    </Link>
  );
};

export default PreviousChat;
