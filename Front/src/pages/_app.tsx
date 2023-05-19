import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Menu from "@/components/Menu";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import { GeneralContextProvider } from "@/context/generalContext";
import { SessionProvider } from "next-auth/react";
import { FormsContextProvider } from "@/context/formsContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className={roboto.className}>
      {/* <Menu/> */}
      <FormsContextProvider>
        <SessionProvider session={session}>
          <GeneralContextProvider>
            <DarkModeSwitch />
          </GeneralContextProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </FormsContextProvider>
    </div>
  );
}
