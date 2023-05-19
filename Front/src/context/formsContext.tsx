import { createContext, useState, ReactNode } from "react";
import { IFormsContext } from "./interface";

export const FormsContext = createContext({
  hasError: false,
  setHasError: (props: boolean) => {},
} as IFormsContext);

export const FormsContextProvider = ({ children }: { children: ReactNode }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <FormsContext.Provider value={{ hasError, setHasError }}>
      {children}
    </FormsContext.Provider>
  );
};
