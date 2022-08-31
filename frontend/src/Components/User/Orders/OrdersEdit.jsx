import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../Inputs/inputs";
import Toggle from "../../Inputs/Toggle";
import { HttpClient } from "../../../utils/httpClients";
//Redux
import { useSelector } from "react-redux";

//styles
import Form from "../../../Styles/Form";
import Flexbox from "../../../Styles/Flexbox";
import { TextDanger } from "../../../Styles/Texts";
import { success, error } from "../../../utils/utils";
import { ButtonDanger } from "../../../Styles/Button";

import { FiX } from "react-icons/fi";
const commonFields = {
  client_name: "",
  client_id: "",
  products_name: "",
  assigned_to: "",
  image: [],
  total_price: 0,
  paid: "",
};

export default function OrdersEdit() {
  const [orderValue, setOrderValue] = useState(commonFields);
  const [orderValueError, orderUserValueError] = useState(commonFields);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [clients, setClients] = useState([]);
  let clientNameArr = [];

  //Redux
  const shop = useSelector((state) => state.office);

  // React Router
  const navigate = useNavigate();
  const param = useParams();

  const http = new HttpClient();

  useEffect(() => {
    http
      .getItemById(`order/${param.id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          setOrderValue(response.data.data);
        }
      })
      .catch((error) => {
        error(error);
      });

    getAllClients();
  }, []);

  const getAllClients = () => {
    shop.client_id.map((obj) => {
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            clientNameArr.push(responseValue);
            setClients([...clientNameArr]);
          } else {
            error("User not found ");
          }
        })
        .catch((error) => {
          error(error);
        });
    });
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      let fileToUpload = [];
      Object.keys(files).map((key) => {
        fileToUpload.push(files[key]);
      });
      setFilesToUpload(fileToUpload);
    } else {
      setOrderValue({ ...orderValue, [name]: value });
    }
    orderUserValueError(validate(orderValue));
  };

  const handleCheck = () => {
    setOrderValue({ ...orderValue, paid: !orderValue.paid });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    orderUserValueError(validate(orderValue));
    if (Object.keys(orderValueError).length === 0) {
      updateForm();
    } else {
      error(
        "Not Ready To UPload because ",
        "user error=",
        Object.keys(orderValueError).length
      );
      error(orderValueError);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.client_name) {
      errors.client_name = "Client Name is required!";
    }
    if (!values.client_id) {
      errors.client_id = "Choose a client";
    }
    if (!values.products_name) {
      errors.products_name = "Please give a name to the product";
    }
    if (!values.assigned_to) {
      errors.assigned_to = "Assign it to someone";
    }

    if (!values.total_price) {
      errors.total_price = "Price is missing";
    }

    return errors;
  };

  const updateForm = () => {
    http
      .uploader(orderValue, filesToUpload, "PUT", `order/${param.id}`, true)
      .then((response) => {
        success(response.data.msg);
        navigate("/user/orders");
      })
      .catch((error) => {
        console.log("In upload Form func =" + error);
        error(error);
      });
  };

  const deleteImageFromDB = (index) => {
    let images = orderValue.image;
    images.splice(index, 1);
    setOrderValue((prev) => {
      return { ...prev, image: images };
    });
    console.log(orderValue.image);
  };

  const deleteImageFromState = (index) => {
    let images = [...filesToUpload];
    images.splice(index, 1);
    console.log(images);
    setFilesToUpload((prev) => {
      return images;
    });
    console.log(filesToUpload);
  };

  return (
    <>
      <Flexbox column align="center">
        <h2>Create an Order</h2>
        <Form>
          <Input
            label="Client Name"
            name="client_name"
            value={orderValue.client_name}
            handleChange={handleChange}
          ></Input>
          <TextDanger>{orderValueError.client_name}</TextDanger>

          <label>Client</label>
          <select
            name="client_id"
            onChange={handleChange}
            value={orderValue.client_id}
          >
            <option value="">--Who's order is this--</option>
            {clients.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
          <TextDanger>{orderValueError.client_id}</TextDanger>

          <Input
            label="Produce Name"
            name="products_name"
            handleChange={handleChange}
            value={orderValue.products_name}
          />
          <TextDanger>{orderValueError.product_id}</TextDanger>

          <label>Assigned To</label>
          <select
            name="assigned_to"
            onChange={handleChange}
            value={orderValue.assigned_to}
          >
            <option value="">---Assigned to--- </option>
            <option value="Accountant">Accountant</option>
            <option value="Designer">Designer</option>
            <option value="Writer">Writer</option>
            <option value="Writer">Staff</option>
          </select>
          <TextDanger>{orderValueError.assigned_to}</TextDanger>
          <Input
            label="Total Price"
            name="total_price"
            type="number"
            value={orderValue.total_price}
            handleChange={handleChange}
          />
          <TextDanger>{orderValueError.product_id}</TextDanger>

          <label>Recipt </label>
          <input type="file" onChange={handleChange} name="image" multiple />
          <Flexbox column>
            {orderValue &&
              orderValue.image &&
              orderValue.image.map((image, index) =>
                image[index] !== undefined ? (
                  <div key={index}>
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + image}
                      alt={image}
                      width="200"
                      height="100"
                    />
                    <ButtonDanger
                      type="button"
                      value={index}
                      onClick={() => {
                        return deleteImageFromDB(index);
                      }}
                    >
                      <FiX></FiX>
                    </ButtonDanger>
                  </div>
                ) : null
              )}
          </Flexbox>
          <Flexbox column>
            {filesToUpload &&
              filesToUpload.map((image, index) =>
                image[index] !== "" ? (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image}
                      width="200"
                      height="100"
                    />
                    <ButtonDanger
                      type="button"
                      value={index}
                      onClick={() => {
                        return deleteImageFromState(index);
                      }}
                    >
                      <FiX></FiX>
                    </ButtonDanger>
                  </div>
                ) : null
              )}
          </Flexbox>

          <Flexbox justify="space-between">
            <label>Paid</label>
            <Toggle
              name="paid"
              onValue={orderValue.paid}
              handleClick={handleCheck}
            />
          </Flexbox>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </>
  );
}
