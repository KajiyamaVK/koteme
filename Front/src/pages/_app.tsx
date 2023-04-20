import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Menu from "@/components/Menu";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import {GeneralContext} from "@/context/generalContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, updateDarkMode] = useState(false);

  return (
    <div className={roboto.className}>
      {/* <Menu/> */}
      <GeneralContext.Provider value={{ isDarkMode, updateDarkMode }}>
        <DarkModeSwitch />
      </GeneralContext.Provider>
      <Component {...pageProps} />
    </div>
  );
}
