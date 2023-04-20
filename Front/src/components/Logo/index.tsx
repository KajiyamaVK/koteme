import { Hind_Siliguri } from "next/font/google";

const font = Hind_Siliguri({ subsets: ["latin"], weight: ["700"] });

export default function Logo() {
  return (
    <div>
      <p className={font.className}>
        <span className="dark:text-black dark:bg-white text-white bg-black leading-10 rounded-br-lg rounded-tl-lg ">
          K
        </span>
        otar<span className="dark:text-teal-500 text-teal-800">M</span>e.
      </p>
    </div>
  );
}
