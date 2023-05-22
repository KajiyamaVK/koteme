import { createContext, ReactNode, useState } from "react";
import { IGeneralContext } from "./interface";

export const GeneralContext = createContext({
  isAuthenticated: false,
  isDarkMode: false,
  updateDarkMode: () => {},
  updateIsAuthenticated: () => {},
} as IGeneralContext);

export const GeneralContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDarkMode, updateDarkMode] = useState<boolean>(false);
  const [isAuthenticated, updateIsAuthenticated] = useState<boolean>(false);

  return (
    <GeneralContext.Provider
      value={{
        isDarkMode,
        updateDarkMode,
        isAuthenticated,
        updateIsAuthenticated,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
