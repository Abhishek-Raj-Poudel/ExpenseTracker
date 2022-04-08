import React from "react";

export function Input({ name, label, type, required, handleChange }) {
  // console.log("handleChange", handleChange);
  return (
    <>
      <label>{label}</label>{" "}
      <input
        name={name}
        type={type ? type : name}
        onChange={handleChange}
        placeholder={`Enter your ${label}`}
        required={required}
      />
    </>
  );
}

