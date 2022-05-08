import React from "react";
import { Link } from "react-router-dom";
import NavbarStyled from "../../Styles/NavbarStyled";
import { connect } from "react-redux";
import {
  changeToDarkTheme,
  changeToLightTheme,
} from "../../Redux/Theme/themeAction";
import ThemeButton from "../Utilities/ThemeButton";

function Navbar({ theme, lightMode, darkMode }) {
  return (
    <nav>
      <NavbarStyled>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </li>
        <li>
          <ThemeButton></ThemeButton>
        </li>
      </NavbarStyled>
    </nav>
  );
}

export default Navbar;
