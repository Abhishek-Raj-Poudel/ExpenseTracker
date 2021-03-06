import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../Inputs/inputs";
import { HttpClient } from "../../../utils/httpClients";

//styles
import Form from "../../../Styles/Form";
import Flexbox from "../../../Styles/Flexbox";
import { TextDanger } from "../../../Styles/Texts";

export default function UserEdit() {
  const commonUserFields = {
    name: "",
    email: "",
    gender: "",
    role: "",
  };
  const [userValue, setUserValue] = useState(commonUserFields);
  const [userValueError, setUserValueError] = useState(commonUserFields);
  // React Router
  const navigate = useNavigate();
  const param = useParams();

  const http = new HttpClient();

  useEffect(() => {
    http
      .getItemById(`user/${param.id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          console.table(response.data.data);
          setUserValue(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError(validate(userValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserValueError(validate(userValue));
    if (Object.keys(userValueError).length === 0) {
      updateForm();
    } else {
      console.log(
        "Not Ready To UPload because ",
        "user error=",
        Object.keys(userValueError).length
      );
      console.log(userValueError);
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
    if (!values.gender) {
      errors.gender = "Please select gender";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };

  const updateForm = () => {
    http
      .updateItem(`user/${param.id}`, userValue, true)
      .then((response) => {
        console.log(response.data.msg);
        navigate("/user/users");
      })
      .catch((error) => {
        console.log(error.data.msg);
      });
  };

  return (
    <>
      <Flexbox column align="center">
        <h1>Edit a User</h1>
        <Form>
          <Input
            label="Name"
            name="name"
            handleChange={handleChange}
            value={userValue.name}
          />
          <TextDanger className="text-danger">{userValueError.name}</TextDanger>

          <Input
            label="Email"
            name="email"
            handleChange={handleChange}
            value={userValue.email}
          ></Input>
          <TextDanger className="text-danger">
            {userValueError.email}
          </TextDanger>

          <label>Role</label>
          <select
            name="role"
            type="role"
            onChange={handleChange}
            value={userValue.role}
          >
            <option value="">--Select A Role--</option>
            <option value="Client">Client</option>
            <option value="Accountant">Accountant</option>
            <option value="Designer">Designer</option>
            <option value="Writer">Writer</option>
            <option value="Writer">Staff</option>
          </select>

          <TextDanger className="text-danger">{userValueError.role}</TextDanger>

          <label>Gender</label>
          <select
            name="gender"
            type="gender"
            onChange={handleChange}
            value={userValue.gender}
          >
            <option value="">--Select A Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <TextDanger className="text-danger">
            {userValueError.gender}
          </TextDanger>

          <button type="submit" onChange={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </>
  );
}
