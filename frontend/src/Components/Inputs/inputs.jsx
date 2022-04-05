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
