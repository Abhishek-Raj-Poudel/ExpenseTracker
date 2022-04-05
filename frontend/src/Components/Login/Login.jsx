import React from "react";
import { Input } from "../Inputs/inputs";

export default function Login() {
  return (
    <>
      <h1>Welcome to Login page</h1>
      <Input name="Email" label="email" required={true}></Input>
      <Input name="Password" label="password" required={true}></Input>
    </>
  );
}
