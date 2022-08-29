import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  background-color: ${({ theme }) => theme.colour.cards};
  color: ${({ theme }) => theme.colour.bodyText};
  gap: 14px;
  padding: ${(props) =>
    props.padding ? props.padding : "20px 20px 48px 20px"};
  border-radius: 0.5rem;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  box-shadow: 1px 10px 5px 1px rgba(0, 0, 0, 0.41);
`;

export default Card;
