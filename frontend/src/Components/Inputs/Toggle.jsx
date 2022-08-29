import React from "react";
import styled from "styled-components";

const ToggleStyle = styled.div`
  display: flex;
  /* justify-content: ${({ turnOn }) =>
    turnOn ? "flex-end" : "flex-start"}; */
  width: 40px;
  height: 24px;
  padding: 2px;
  background-color: ${({ theme, turnOn }) =>
    turnOn ? theme.colour.primary : theme.colour.subtleText};
  border-radius: 50px;
  transition: all 100ms ease-in;
`;
const Circle = styled.div`
  /* justify-self: end; */
  width: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colour.toggle};
  transform: ${({ turnOn }) =>
    turnOn ? "translateX(16px)" : "translateX(0px)"};
  transition: all 100ms ease-in;
`;
export default function Toggle({ handleClick, onValue }) {
  return (
    <ToggleStyle turnOn={onValue} onClick={handleClick}>
      <Circle turnOn={onValue}></Circle>
    </ToggleStyle>
  );
}
