import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? props.align : "center")};
  background-color: ${({ theme }) => theme.colour.cards};
  color: ${({ theme }) => theme.colour.bodyText};
  gap: 14px;
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  border-radius: 0.5rem;
  margin: ${(props) => (props.margin ? props.margin : "0")};
`;

export default Card;
