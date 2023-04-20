import { createContext, ReactNode, useState } from "react";
import { GeneralContextType } from "./interface";

export const GeneralContext = createContext<GeneralContextType | null>(null);

const GeneralContextProvider = (children: ReactNode) => {
  const [isDarkMode, updateDarkMode] = useState<boolean>(false);

 

  return (
    <GeneralContext.Provider value={{ isDarkMode, updateDarkMode }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
