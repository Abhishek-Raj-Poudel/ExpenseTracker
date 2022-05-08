import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Inputs/inputs";
import { HttpClient } from "../../../utils/httpClients";

//Redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOfficeSuccess,
  fetchOfficeFaliure,
} from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
import Form from "../../../Styles/Form";

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
  const [userValue, setUserValue] = useState(commonUserFields);
  const [userValueError, setUserValueError] = useState(commonUserFields);
  const navigate = useNavigate();
  const http = new HttpClient();

  //Redux stuff
  const dispatch = useDispatch();
  const shop_id = useSelector((state) => state.user.shop_id);
  const shop = useSelector((state) => state.office);
  const allUsers = useSelector((state) => state.office.user_id);
  let updatedAllUsers = [];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError(validate(userValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("1");
    setUserValueError(validate(userValue));
    if (Object.keys(userValueError).length === 0) {
      console.log("2");
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
    setUserValue({
      ...userValue,
      shop_id: shop_id,
    });
  }, []);

  const uploadForm = () => {
    console.log("3");
    console.log(userValue.shop_id);
    console.log("shop_id", shop.id);
    if (userValue.shop_id) {
      http
        .postItem("user", userValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        })
        .then((response) => {
          console.log("4");
          if (response.data.status === 200) {
            console.log("5");

            updatedAllUsers = [...allUsers, response.data.data._id];
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
    http
      .updateItem(
        `shop/${shop_id}`,
        { ...shop, user_id: updatedAllUsers },
        true
      )
      .then((response) => {
        console.log({ ...shop, user_id: updatedAllUsers });
        dispatch(fetchOfficeSuccess({ ...shop, user_id: updatedAllUsers }));
        console.log("final shop update ", response);
      })
      .catch((error) => {
        dispatch(fetchOfficeFaliure(error.msg));
      });
    navigate("/user/users");
  };

  const test = () => {
    console.log("shop ", shop);
    console.log("shop updated ", { ...shop, user_id: updatedAllUsers });
  };

  return (
    <>
      <Flexbox column align="center">
        <h1>Create a User</h1>
        <Form>
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
          <button
            onClick={() => {
              test();
            }}
          >
            Test
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </>
  );
}
