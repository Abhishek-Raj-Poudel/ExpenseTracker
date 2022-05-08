import { LIGHT_THEME, DARK_THEME } from "./themeType";
import { themeLight } from "../../Styles/theme";

const initialState = {
  theme: themeLight,
  lightTheme: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIGHT_THEME:
      return {
        ...state,
        theme: action.payload,
        lightTheme: true,
      };
    case DARK_THEME:
      return {
        ...state,
        theme: action.payload,
        lightTheme: false,
      };
    default:
      return state;
  }
};

export default reducer;
