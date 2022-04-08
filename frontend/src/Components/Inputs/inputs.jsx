import React from "react";

export function Input({ name, label, required }) {
  return (
    <>
      <label>{label}</label>{" "}
      <input
        name={name}
        type={name}
        placeholder={`Enter your ${label}`}
        required={required}
      />
    </>
  );
}

