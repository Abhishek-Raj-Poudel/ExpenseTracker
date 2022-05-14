import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Input } from "../Inputs/inputs";
import { HttpClient } from "../../utils/httpClients";

// style
import Card from "../../Styles/Form";
import Flexbox from "../../Styles/Flexbox";
import { TextDanger } from "../../Styles/Texts";

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
  const [userValueError, setUserValueError] = useState(commonUserFields);
  const [officeValue, setOfficeValue] = useState(commonOfficeFields);
  const [officeValueError, setOfficeValueError] = useState(commonOfficeFields);
  const [canSubmit, setCanSubmit] = useState(false);
  const [canOfficeSubmit, setCanOfficeSubmit] = useState(false);

  const navigate = useNavigate();

  const http = new HttpClient();

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
    setUserValueError(validate(userValue));
  };

  const handleOfficeChange = (event) => {
    const { name, value } = event.target;
    setOfficeValue({ ...officeValue, [name]: value });
    setOfficeValueError(officeFormValidate(officeValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserValueError(validate(userValue));
    console.log(userValueError);
    setOfficeValueError(officeFormValidate(officeValue));
    console.log(officeValueError);
    if (
      Object.keys(officeValueError).length === 0 &&
      Object.keys(userValueError).length === 0
    ) {
      uploadForm();
    } else {
      console.log(
        "Not Ready To UPload because ",
        "user error=",
        Object.keys(userValueError).length,
        "Office error = ",
        Object.keys(officeValueError).length
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

  const uploadForm = () => {
    http
      .postItem("shop", officeValue, {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      })
      .then((response) => {
        if (response.status === 200) {
          setUserValue({ ...userValue, shop_id: response.data.data._id });

          console.log("User Value ", userValue);
          console.log("Shop data Uploaded ", response.data.data);
          setCanSubmit(true);
          // success(response.data.msg);
        } else {
          // error(response.data.msg);
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.log("Error: ", error.msg);
      });
  };
  useEffect(() => {
    if (canSubmit) {
      http
        .postItem("user", userValue, {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
        })
        .then((response) => {
          if (response.data.status === 200) {
            setOfficeValue({
              ...officeValue,
              staff_id: [response.data.data._id],
            });
            setCanSubmit(false);
            setCanOfficeSubmit(true);
          } else {
            console.log(response.data.msg);
            setCanSubmit(false);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          setCanSubmit(false);
        });
    } else {
      console.log("cant submit because canSubmit is ", canSubmit);
    }

    if (canOfficeSubmit) {
      console.log("User data ", userValue);
      console.log("shop data ", officeValue);
      http
        .updateItem(`shop/${userValue.shop_id}`, officeValue, true)
        .then((response) => {
          if (response.data.status === 200) {
            // setUserValue({ ...officeValue, user_id: [response.data.data._id] });
            console.log("User Value updated ", response.data.data);
            setCanOfficeSubmit(false);
            // localStorage.setItem("register_success", true);
            navigate("/login");
          } else {
            // error(response.data.msg);
            console.log(response.data.msg);
            setCanOfficeSubmit(false);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          setCanOfficeSubmit(false);
        });
    } else {
      console.log("cant submit office because canSubmit is ", canOfficeSubmit);
    }
  }, [canSubmit, canOfficeSubmit]);
  return (
    <Flexbox column align="center">
      <h2>Register </h2>
      <Flexbox>
        <Card>
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
        </Card>
        <Card>
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
        </Card>
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
