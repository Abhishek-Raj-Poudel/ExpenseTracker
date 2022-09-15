import React from "react";
import styled from "styled-components";

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export function Input({ name, label, type, required, handleChange, value }) {
  return (
    <InputStyle>
      <label>{label}</label>
      <input
        name={name}
        type={type ? type : name}
        onChange={handleChange}
        placeholder={`Enter your ${label}`}
        value={value}
        required={required}
      />
    </InputStyle>
  );
}

