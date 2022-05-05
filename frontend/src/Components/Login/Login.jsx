import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Inputs/inputs";
import { HttpClient } from "../../utils/httpClients";

// styled components
import Form from "../../Styles/Form";
import Flexbox from "../../Styles/Flexbox";
import { TextDanger } from "../../Styles/Texts";

export default function Login() {
  const [email, setEmail] = useState();
  const [emailErr, setEmailErr] = useState();
  const [password, setPassword] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const navigate = useNavigate();

  const http = new HttpClient();

  const handleChange = (event) => {
    const { name, value } = event.target;
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
          const { _id, name, role, image, shop_id } = response.data.data.user;
          const userValue = { _id, name, role, image, shop_id };
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user_value", JSON.stringify(userValue));
          navigate("/user");
        } else {
          console.log("User Not Found 😭");
        }
      })
      .catch((error) => {
        console.log("LoginError ", error);
      });
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (loggedIn) {
      navigate("/user");
    }
  });

  return (
    <Flexbox column align="center">
      <h2>Login</h2>
      <Flexbox>
        <Form>
          <Input
            label="Email"
            name="email"
            handleChange={handleChange}
            required={true}
          ></Input>{" "}
          <TextDanger className="text-danger">{emailErr}</TextDanger>{" "}
          <Input
            label="Password"
            name="password"
            handleChange={handleChange}
            required={true}
          ></Input>{" "}
          <TextDanger className="text-danger">{passwordErr}</TextDanger>{" "}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </Flexbox>
  );
}

export function Logout() {
  const navigate = useNavigate();
  localStorage.clear();
  useEffect(() => {
    navigate("/login");
  });

  return null;
}
