import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Inputs/inputs";
import { HttpClient } from "../../utils/httpClients";

export default function Register() {
  const commonUserFields = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    gender: "",
    role: "",
  };
  const commonOfficeFields = {
    name: "",
    service: "",
  };
  const [userValue, setUserValue] = useState(commonUserFields);
  const [userValueError, setUserValueError] = useState(commonUserFields);
  const [officeValue, setOfficeValue] = useState(commonOfficeFields);
  const [officeValueError, setOfficeValueError] = useState(commonOfficeFields);
  const [isSubmit, setIsSubmit] = useState(true);

  const navigate = useNavigate();

  const http = new HttpClient();

  console.log("env", process.env.REACT_APP_BASE_URL);

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
  };
  const handleOfficeChange = (event) => {
    const { name, value } = event.target;
    setOfficeValue({ ...officeValue, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserValueError(validate(userValue));
    setOfficeValueError(officeFormValidate(officeValue));
    console.log("User", userValue);
    console.log("Office", officeValue);
    setIsSubmit(false);
  };

  useEffect(() => {
    console.log("isSubmit ", isSubmit);
    if (
      Object.keys(officeValueError).length === 0 &&
      Object.keys(userValueError).length === 0 &&
      !isSubmit
    ) {
      http
        .postItem("shop", officeValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        })
        .then((response) => {
          if (response.data.data === 200) {
            // success(response.data.msg);
            console.log(response.data.msg);
          } else {
            // error(response.data.msg);
            console.log(response.data.msg);
          }
          // console.log('response: ', response)
        })
        .catch((error) => {
          console.log("Error: ", error.msg);
        });
      http
        .postItem("user", userValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        })
        .then((response) => {
          if (response.data.data === 200) {
            // success(response.data.msg);
            console.log(response.data.msg);
            setIsSubmit(true);
            navigate("/login");

            localStorage.setItem("register_success", true);
            navigate("/login");
          } else {
            // error(response.data.msg);
            console.log(response.data.msg);
          }
          // console.log('response: ', response)
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      console.log(
        "Not Ready To UPload because ",
        "user error=",
        Object.keys(userValueError).length,
        "Office error = ",
        Object.keys(officeValueError).length,
        isSubmit
      );
    }
  });

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //find out about regex
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    if (!values.re_password) {
      errors.re_password = "re-password is required";
    } else if (!values.re_password === values.password) {
      errors.re_password = "Password didn't match";
    }
    if (!values.gender) {
      errors.gender = "Please select gender";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };
  const officeFormValidate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.service) {
      errors.service = "Service is required";
    }
    return errors;
  };

  return (
    <>
      <h1>Register a User and office</h1>
      <h3>User's Detail</h3>
      <Input
        label="Name"
        name="name"
        handleChange={handleUserChange}
      ></Input>{" "}
      <span className="text-danger">{userValueError.name}</span>{" "}
      <Input
        label="Email"
        name="email"
        handleChange={handleUserChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{userValueError.email}</span>{" "}
      <Input
        label="Password"
        name="password"
        handleChange={handleUserChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{userValueError.password}</span>{" "}
      <Input
        label="Re-Password"
        name="re_password"
        type="password"
        handleChange={handleUserChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{userValueError.re_password}</span>{" "}
      <label>Gender</label>{" "}
      <select name="gender" type="gender" onChange={handleUserChange}>
        <option value="">--Select A Gender--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>{" "}
      <span className="text-danger">{userValueError.gender}</span>{" "}
      <h3>User's Office</h3>
      <Input
        label="Office Name"
        name="name"
        handleChange={handleOfficeChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{officeValueError.name}</span>{" "}
      <label>Role</label>{" "}
      <select name="role" type="role" onChange={handleUserChange}>
        <option value="">--Select A Role--</option>
        <option value="Head">Head</option>
      </select>{" "}
      <span className="text-danger">{officeValueError.role}</span>{" "}
      <Input
        label="Service"
        name="service"
        handleChange={handleOfficeChange}
      ></Input>{" "}
      <span className="text-danger">{officeValueError.service}</span>{" "}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
