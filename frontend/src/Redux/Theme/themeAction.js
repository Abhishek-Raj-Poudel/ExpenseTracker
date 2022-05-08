import { LIGHT_THEME, DARK_THEME } from "./themeType";
import { themeLight, themeDark } from "../../Styles/theme";

export const changeToLightTheme = () => {
  return {
    type: LIGHT_THEME,
    payload: themeLight,
  };
};
export const changeToDarkTheme = () => {
  return {
    type: DARK_THEME,
    payload: themeDark,
  };
};
