import styled from "styled-components";

export const TextDanger = styled.span`
  color: ${({ theme }) => theme.colour.danger};
`;
export const StyledText = styled.span`
  color: ${({ theme, colour }) =>
    colour ? theme.colour[colour] : theme.colour.success};
`;
export const TextWarning = styled.span`
  color: ${({ theme }) => theme.colour.warning};
`;
