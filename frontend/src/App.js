import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import AppRouting from "./AppRouting";
import GlobalStyle from "./Styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

function App(props) {
  return (
    <>
      <ThemeProvider theme={props.theme}>
        <GlobalStyle />
        <AppRouting />
      </ThemeProvider>
      <ToastContainer theme="dark" />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme.theme,
  };
};

export default connect(mapStateToProps)(App);
