import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Inputs/inputs";
import { HttpClient } from "../../utils/httpClients";

export default function Login() {
  const [email, setEmail] = useState();
  const [emailErr, setEmailErr] = useState();
  const [password, setPassword] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const navigate = useNavigate();

  const http = new HttpClient();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(email);
    console.log(password);
    if (name === "email") {
      if (!(value && value.includes("@") && value.includes(".com"))) {
        setEmailErr("Invalid Email format");
      } else {
        setEmailErr("");
      }

      setEmail(value);
    }
    if (name === "password") {
      if (!(value && value.length >= 8)) {
        setPasswordErr("Password length does not match.");
      } else {
        setPasswordErr("");
      }

      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    http
      .postItem(
        "auth",
        {
          email: email,
          password: password,
        },
        {
          // "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        }
      )
      .then((response) => {
        if (response.data.data) {
          localStorage.setItem("token", response.data.data.token);
          navigate("/user");
        } else {
          console.log("User Not Found 😭");
        }
      })
      .catch((error) => {
        console.log("LoginError ", error);
      });
  };

  return (
    <>
      <Input
        label="Email"
        name="email"
        handleChange={handleChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{emailErr}</span>{" "}
      <Input
        label="Password"
        name="password"
        handleChange={handleChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{passwordErr}</span>{" "}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
