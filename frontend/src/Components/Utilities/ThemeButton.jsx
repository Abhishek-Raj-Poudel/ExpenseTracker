import React from "react";
import { connect } from "react-redux";
import {
  changeToDarkTheme,
  changeToLightTheme,
} from "../../Redux/Theme/themeAction";

function ThemeButton({ theme, darkMode, lightMode }) {
  return (
    <button
      onClick={() => {
        theme.lightTheme ? darkMode() : lightMode();
      }}
    >
      Theme Button
    </button>
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
