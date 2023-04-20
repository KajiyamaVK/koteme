//Precisa da interface para consumir o contexto

export type GeneralContextType = {
  isDarkMode: boolean;
  updateDarkMode: (props: boolean) => void;
};
