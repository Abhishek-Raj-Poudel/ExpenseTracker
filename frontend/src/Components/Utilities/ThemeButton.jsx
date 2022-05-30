import React from "react";
import { connect } from "react-redux";
import {
  changeToDarkTheme,
  changeToLightTheme,
} from "../../Redux/Theme/themeAction";

import Toggle from "../Inputs/Toggle";

function ThemeButton({ theme, darkMode, lightMode }) {
  return (
    <>
      <Toggle
        onValue={theme.darkTheme}
        handleClick={() => {
          theme.darkTheme ? lightMode() : darkMode();
        }}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    lightMode: () => dispatch(changeToLightTheme()),
    darkMode: () => dispatch(changeToDarkTheme()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);
