import styled from "styled-components";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? props.align : "flex-start")};
  background-color: ${({ theme }) => theme.colour.cards};
  color: ${({ theme }) => theme.colour.bodyText};
  gap: 14px;
  padding: 8px 1rem 2rem 1rem;
  border-radius: 0.5rem;
`;

export default Form;
