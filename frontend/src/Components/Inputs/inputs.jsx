import React from "react";
import styled from "styled-components";

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export function Input({ name, label, type, required, handleChange }) {
  // console.log("handleChange", handleChange);
  return (
    <InputStyle>
      <label>{label}</label>{" "}
      <input
        name={name}
        type={type ? type : name}
        onChange={handleChange}
        placeholder={`Enter your ${label}`}
        required={required}
      />
    </InputStyle>
  );
}
export function Select({ label, name, parentId, options, required }) {
  return (
    <>
      <label>{label}</label>{" "}
      <select name={name} id={name} required={required}>
        <option value="">--Select Any One--</option>
        {options.map((obj, index) => (
          <option key={index} value={obj._id ? obj._id : obj}>
            {obj.name ? obj.name : obj}
          </option>
        ))}
      </select>
    </>
  );
}
