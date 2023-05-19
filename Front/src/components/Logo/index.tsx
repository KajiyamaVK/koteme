import { Hind_Siliguri } from "next/font/google";
import iProps from "./interface";

const font = Hind_Siliguri({ subsets: ["latin"], weight: ["700"] });

export default function Logo(props: iProps) {
  const letterKClass = props.isLoginPage
    ? "bg-gray-100 text-gray-900 xl:bg-gray-900 dark:xl:bg-white dark:xl:text-gray-900 xl:text-gray-100 dark:text-gray-900"
    : "dark:text-black dark:bg-white text-white bg-black";

  const logoClass = props.isLoginPage
    ? "xl:text-gray-900 dark:text-gray-100  text-gray-100"
    : "dark:text-black text-white ";

  return (
    <span className={`${font.className} ${props.className}`}>
      <span
        className={` ${letterKClass} leading-10 rounded-br-lg rounded-tl-lg `}
      >
        K
      </span>
      <span className={logoClass}>ote</span>
      <span className="text-teal-500">M</span>
      <span className={logoClass}>e.</span>
    </span>
  );
}
