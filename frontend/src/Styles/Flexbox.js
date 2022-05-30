import styled from "styled-components";

const Flexbox = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "stretch")};
  gap: ${(props) => (props.gap ? props.gap : "8px")};
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
`;
export default Flexbox;
