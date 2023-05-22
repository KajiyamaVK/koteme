//Precisa da interface para consumir o contexto

export interface IGeneralContext {
  isDarkMode: boolean;
  updateDarkMode: (props: boolean) => void;
  isAuthenticated: boolean;
  updateIsAuthenticated: (props: boolean) => void;
}

export interface IFormsContext {
  hasError: boolean;
  setHasError: (props: boolean) => void;
}
