import styled from "styled-components";

const NavbarStyled = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  list-style-type: none;
  gap: 1rem;
  padding: 1rem;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.colour.bodyText};
  }
`;

export default NavbarStyled;
