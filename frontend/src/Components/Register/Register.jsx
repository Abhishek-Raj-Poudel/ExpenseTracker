import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Input } from "../Inputs/inputs";
import { HttpClient } from "../../utils/httpClients";
import { validate } from "../../utils/validation";
// style
import Flexbox from "../../Styles/Flexbox";
import { TextDanger } from "../../Styles/Texts";
import { error, success } from "../../utils/utils";
import Form from "../../Styles/Form";

function Register() {
  const commonUserFields = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    gender: "",
    role: "Head",
  };
  const commonOfficeFields = {
    name: "",
    service: "",
  };
  const [userValue, setUserValue] = useState(commonUserFields);
  const [userValueError, setUserValueError] = useState({});
  const [officeValue, setOfficeValue] = useState(commonOfficeFields);
  const [officeValueError, setOfficeValueError] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const tempUploadForm = useRef();

  const navigate = useNavigate();

  const http = new HttpClient();

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
    setOfficeValueError(validate(officeValue));
    setCanSubmit(true);
  };

  const uploadForm = async () => {
    try {
      if (
        Object.keys(officeValueError).length === 0 &&
        Object.keys(userValueError).length === 0 &&
        canSubmit
      ) {
        const createShop = await http.postItem("shop", officeValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        });
        if (createShop.status !== 200) throw error(createShop.msg);
        const userUploadData = {
          ...userValue,
          shop_id: createShop.data.data._id,
        };
        const createUser = await http.postItem("user", userUploadData, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        });

        if (createUser.data.status !== 200) throw error(createUser.msg);
        const officeUploadData = {
          ...officeValue,
          roles: ["Head", "Client"],
          staff_id: [createUser.data.data._id],
        };

        const updateShop = await http.updateItem(
          `shop/${createShop.data.data._id}`,
          officeUploadData,
          true
        );
        if (updateShop.data.status !== 200) throw error(updateShop.msg);
        success("User and Shop created successfully");
        navigate("/login");
      } else if (canSubmit) {
        error("Some problems in form");
        setCanSubmit(false);
      }
    } catch (err) {
      error(err);
    }
  };

  tempUploadForm.current = uploadForm;

  useEffect(() => {
    // uploadForm();
    tempUploadForm.current();
  }, [userValueError, officeValueError]);

  return (
    <Flexbox column align="center">
      <h2>Register </h2>
      <Flexbox>
        <Form>
          <h3>User's Detail</h3>
          <Input
            label="Name"
            name="name"
            handleChange={handleUserChange}
          ></Input>
          <TextDanger className="text-danger">{userValueError.name}</TextDanger>
          <Input
            label="Email"
            name="email"
            handleChange={handleUserChange}
            required={true}
          ></Input>
          <TextDanger className="text-danger">
            {userValueError.email}
          </TextDanger>
          <Input
            label="Password"
            name="password"
            handleChange={handleUserChange}
            required={true}
          ></Input>
          <TextDanger className="text-danger">
            {userValueError.password}
          </TextDanger>
          <Input
            label="Re-Password"
            name="re_password"
            type="password"
            handleChange={handleUserChange}
            required={true}
          ></Input>
          <TextDanger className="text-danger">
            {userValueError.re_password}
          </TextDanger>
          <label>Gender</label>
          <select name="gender" type="gender" onChange={handleUserChange}>
            <option value="">--Select A Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <TextDanger className="text-danger">
            {userValueError.gender}
          </TextDanger>
        </Form>
        <Form>
          <h3>User's Office</h3>

          <Input
            label="Office Name"
            name="name"
            handleChange={handleOfficeChange}
            required={true}
          ></Input>
          <TextDanger className="text-danger">
            {officeValueError.name}
          </TextDanger>

          <Input
            label="Service"
            name="service"
            handleChange={handleOfficeChange}
          ></Input>
          <TextDanger className="text-danger">
            {officeValueError.service}
          </TextDanger>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </Flexbox>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    officeDate: state.office,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
