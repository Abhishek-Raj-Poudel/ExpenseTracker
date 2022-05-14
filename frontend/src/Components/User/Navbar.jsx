import React from "react";
import NavbarStyled from "../../Styles/NavbarStyled";
import ThemeButton from "../Utilities/ThemeButton";
import styled from "styled-components";

const StyledNav = styled.nav`
  grid-area: navbar;
`;

function Navbar() {
  return (
    <StyledNav>
      <NavbarStyled>
        <li>
          <ThemeButton></ThemeButton>
        </li>
      </NavbarStyled>
    </StyledNav>
  );
}

export default Navbar;
