import React, { useState } from "react";
import AppRouting from "./AppRouting";
import GlobalStyle from "./Styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { themeLight, themeDark } from "./Styles/theme";

function App() {
  const [lightMode, setLightMode] = useState(true);
  const [theme, setTheme] = useState(themeDark);

  const themeChanger = () => {
    if (lightMode) {
      setTheme(themeDark);
      setLightMode(false);
    } else {
      setTheme(themeLight);
      setLightMode(true);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouting></AppRouting>;
    </ThemeProvider>
  );
}

export default App;
