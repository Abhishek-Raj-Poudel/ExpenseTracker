import React from "react";
import NavbarStyled from "../../Styles/NavbarStyled";
import ThemeButton from "../Utilities/ThemeButton";

function Navbar() {
  return (
    <nav>
      <NavbarStyled>
        <li>
          <ThemeButton></ThemeButton>
        </li>
      </NavbarStyled>
    </nav>
  );
}

export default Navbar;
