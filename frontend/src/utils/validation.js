export const validate = (values) => {
  const propertyNames = Object.keys(values);
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //find out about regex

  propertyNames.map((propertyName) => {
    !values[propertyName] &&
      (errors[propertyName] = `${propertyName} is required !!!`);

    propertyName === "email" &&
      !regex.test(values.email) &&
      (errors.email = "This is not a valid email format!");

    propertyName === "password" &&
      values.password.length < 4 &&
      (errors.password = "Password must be more than 4 characters");

    propertyName === "re_password" &&
      values.re_password !== values.password &&
      (errors.re_password = "Password didn't match");
  });
  return errors;
};

export const orderValidate = (values) => {
  const errors = {};
  !values.client_name && (errors.client_name = "Client Name is required !!");

  !values.client_id && (errors.client_id = "Select a client !!");

  !values.products_name &&
    (errors.products_name = "Product name is required !!");

  !values.assigned_to && (errors.assigned_to = "Who is this assigned to ?");

  return errors;
};
