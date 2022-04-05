import React, { useState } from "react";
import { Input } from "../Inputs/inputs";

export default function Register() {
  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
    gender: "",
    role: "",
  });
  const [officeValue, setOfficeValue] = useState({
    name: "",
    service: "",
  });

  const handleUserChange = (event) => {};
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Register a User and office</h1>
      <h3>User</h3>
      <Input label="Name" name="name" required={true}></Input>{" "}
      <Input label="Email" name="email" required={true}></Input>{" "}
      <Input label="Password" name="password" required={true}></Input>{" "}
      <Input label="Re-Password" name="re_password" required={true}></Input>{" "}
      <label>Gender</label>{" "}
      <select name="gender">
        <option value="">--Select A Gender--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>{" "}
      <h3>Office</h3>
      {
        // TODO: Add a switch which changes to add a shop
      }
      <Input label="Office Name" name="officeName" required={true}></Input>{" "}
      <label>Role</label>{" "}
      <select name="role" value="Head">
        <option value="">--Select A Role--</option>
        <option value="Head">Head</option>
      </select>{" "}
      <Input label="Service" name="service"></Input>{" "}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
