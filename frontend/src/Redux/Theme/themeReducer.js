import { LIGHT_THEME, DARK_THEME } from "./themeType";
import { themeLight } from "../../Styles/theme";

const initialState = {
  theme: themeLight,
  darkTheme: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIGHT_THEME:
      return {
        ...state,
        theme: action.payload,
        darkTheme: false,
      };
    case DARK_THEME:
      return {
        ...state,
        theme: action.payload,
        darkTheme: true,
      };
    default:
      return state;
  }
};

export default reducer;
