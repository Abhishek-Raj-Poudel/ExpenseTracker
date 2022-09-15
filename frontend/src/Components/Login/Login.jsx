import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Inputs/inputs";
import { HttpClient } from "../../utils/httpClients";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFaliure,
} from "../../Redux/User/userAction";
import {
  fetchOfficeSuccess,
  fetchOfficeFaliure,
} from "../../Redux/Office/officeAction";

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

  const dispatch = useDispatch();
  const shop_id = useSelector((state) => state.user.shop_id);

  let userValue;

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
      }

      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchUserRequest);
    http
      .postItem(
        "auth",
        {
          email: email,
          password: password,
        },
        {
          "content-type": "application/json",
        }
      )
      .then((response) => {
        if (response.data.data) {
          const { _id, name, role, shop_id } = response.data.data.user;
          userValue = { _id, name, role, shop_id };
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user_id", _id);
          localStorage.setItem("user_value", JSON.stringify(userValue));
          dispatch(fetchUserSuccess(userValue));
          getOffice();
          // navigate("/user");
        } else {
          dispatch(fetchUserFaliure("User Not Found 😭"));
        }
      })
      .catch((error) => {
        dispatch(fetchUserFaliure(error));
      });
  };

  const getUser = () => {
    http
      .getItemById(`user/${localStorage.getItem("user_id")}`)
      .then((response) => {
        dispatch(fetchUserSuccess(response.data.data.user));
      })
      .catch((error) => {
        dispatch(fetchOfficeFaliure(error.msg));
      });
  };

  const getOffice = () => {
    http
      .getItemById(`shop/${shop_id}`)
      .then((response) => {
        dispatch(fetchOfficeSuccess(response.data.data));
        navigate("/user");
      })
      .catch((error) => {
        dispatch(fetchOfficeFaliure(error.msg));
      });
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    if (loggedIn) {
      getUser();
      getOffice();
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
