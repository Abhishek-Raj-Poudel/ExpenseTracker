import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input } from "../../Inputs/inputs";
import { HttpClient } from "../../../utils/httpClients";

export default function UserCreate() {
  const commonUserFields = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    gender: "",
    role: "",
    shop_id: null,
  };
  const [shop, setShop] = useOutletContext();
  const [userValue, setUserValue] = useState(commonUserFields);
  const [userValueError, setUserValueError] = useState(commonUserFields);
  const [updateShops, setUpdateShops] = useState([]);
  let updateUserId = [];
  let shopFinalValue = {};

  const navigate = useNavigate();

  const http = new HttpClient();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError(validate(userValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserValueError(validate(userValue));
    console.log("User Value ", userValue);
    console.log("User Error ", userValueError);
    if (Object.keys(userValueError).length === 0) {
      uploadForm();
    } else {
      console.log(
        "Not Ready To UPload because ",
        "user error=",
        Object.keys(userValueError).length
      );
    }
  };

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

  useEffect(() => {
    if (shop) {
      setUserValue({
        ...userValue,
        shop_id: shop._id,
      });
      console.log("Shop id ", shop._id);
      console.log("Shop id in user ", userValue.shop_id);
    }
  }, [shop]);

  const uploadForm = () => {
    console.log("About to upload user value ", userValue);
    if (userValue.shop_id) {
      http
        .postItem("user", userValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        })
        .then((response) => {
          if (response.data.status === 200) {
            updateUserId = [...shop.user_id, response.data.data._id];
            console.log("updated array ", updateUserId);

            shopFinalValue = {
              ...shop,
              user_id: updateUserId,
            };

            console.log("Final Shop Update", shopFinalValue);
            UpdateShop();
          } else {
            // error(response.data.msg);
            console.log(response.data.msg);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  const UpdateShop = () => {
    console.log("shop value in update shop function", shop);
    http
      .updateItem(`shop/${shop._id}`, shopFinalValue, true)
      .then((response) => {
        console.log("final shop update ", response);
      })
      .catch((error) => {});
    navigate("/user/users");
  };

  return (
    <>
      <h1>Create a User and office</h1>
      <Input label="Name" name="name" handleChange={handleChange} />{" "}
      <span className="text-danger">{userValueError.name}</span>{" "}
      <Input
        label="Email"
        name="email"
        handleChange={handleChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{userValueError.email}</span>{" "}
      <label>Role</label>{" "}
      <select name="role" type="role" onChange={handleChange}>
        <option value="">--Select A Role--</option>
        <option value="Client">Client</option>
        <option value="Accountant">Accountant</option>
        <option value="Designer">Designer</option>
        <option value="Writer">Writer</option>
        <option value="Writer">Staff</option>
      </select>{" "}
      <span className="text-danger">{userValueError.role}</span>{" "}
      <label>Gender</label>{" "}
      <select name="gender" type="gender" onChange={handleChange}>
        <option value="">--Select A Gender--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>{" "}
      <span className="text-danger">{userValueError.gender}</span>{" "}
      <Input
        label="Password"
        name="password"
        handleChange={handleChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{userValueError.password}</span>{" "}
      <Input
        label="Re-Password"
        name="re_password"
        type="password"
        handleChange={handleChange}
        required={true}
      ></Input>{" "}
      <span className="text-danger">{userValueError.re_password}</span>{" "}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
