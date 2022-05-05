import React from "react";
import { Link } from "react-router-dom";
import Flexbox from "../../Styles/Flexbox";
import NavbarStyled from "../../Styles/NavbarStyled";

export default function Navbar() {
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
          <button></button>
        </li>
      </NavbarStyled>
    </nav>
  );
}
