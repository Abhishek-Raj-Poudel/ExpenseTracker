import styled from "styled-components";

export const ButtonDanger = styled.button`
  background-color: ${({ theme }) => theme.colour.danger};
  color: ${({ theme }) => theme.colour.bodyText};
`;
