export const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //find out about regex

  !values.name && (errors.name = "Name is required!");

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
  } else if (values.re_password !== values.password) {
    errors.re_password = "Password didn't match";
  }
  !values.gender && (errors.gender = "Please select gender");

  return errors;
};

export const officeValidate = (values) => {
  const errors = {};
  !values.name && (errors.name = "Name is required!");
  !values.service && (errors.service = "Service is required");

  return errors;
};
