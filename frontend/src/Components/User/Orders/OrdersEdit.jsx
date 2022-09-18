import React, { useEffect, useState, useRef } from "react";
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
import { orderValidate, validate } from "../../../utils/validation";
const commonFields = {
  client_name: "",
  client_id: "",
  products_name: "",
  assigned_to: "",
  image: "",
  old_image: "",
  total_price: 0,
  paid: "",
};

export default function OrdersEdit() {
  const [orderValue, setOrderValue] = useState(commonFields);
  const [orderValueError, setOrderValueError] = useState(commonFields);
  const [filesToUpload, setFilesToUpload] = useState();
  const [clients, setClients] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const IMAGE_URL = "https://test-api-chronoabi.herokuapp.com/assets/images/";
  let clientNameArr = [];

  //Redux
  const SHOP = useSelector((state) => state.office);

  // React Router
  const navigate = useNavigate();
  const param = useParams();

  const http = new HttpClient();

  const tempGetAllClients = useRef();
  const tempSubmitValue = useRef();

  const getAllClients = () => {
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

    SHOP.client_id.map((obj) =>
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
        })
    );
  };

  tempGetAllClients.current = getAllClients;

  useEffect(() => {
    tempGetAllClients.current();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      let fileToUpload = [];
      Object.keys(files).map((key) => fileToUpload.push(files[key]));
      if (!orderValue.old_image) {
        setOrderValue((prev) => {
          return { ...prev, old_image: prev.image, image: "" };
        });
      }
      setFilesToUpload(fileToUpload);
    } else {
      setOrderValue({ ...orderValue, [name]: value });
    }
    setOrderValueError(validate(orderValue));
  };

  const handleCheck = () => {
    setOrderValue({ ...orderValue, paid: !orderValue.paid });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderValueError(orderValidate(orderValue));
    setCanSubmit(true);
  };

  const submitValue = () => {
    if (Object.keys(orderValueError).length === 0 && canSubmit) {
      updateForm();
    } else if (canSubmit) {
      error("Some things are left!");
      setCanSubmit(false);
    }
  };

  tempSubmitValue.current = submitValue;

  useEffect(() => {
    tempSubmitValue.current();
  }, [orderValueError]);

  const updateForm = async () => {
    try {
      const update = await http.uploader(
        orderValue,
        filesToUpload,
        "PUT",
        `order/${param.id}`,
        true
      );

      success(update.data.msg);
      navigate("/user/orders");
    } catch (error) {
      error(error.msg);
    }
  };

  const deleteImageFromDB = () => {
    setOrderValue((prev) => {
      return { ...prev, old_image: prev.image, image: "" };
    });
  };

  const deleteImageFromState = (index) => {
    let images = [...filesToUpload];
    images.splice(index, 1);
    setFilesToUpload(() => {
      return images;
    });
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
            {SHOP &&
              SHOP.roles &&
              SHOP.roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
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
            {orderValue && orderValue.image && (
              <div>
                <img
                  src={IMAGE_URL + orderValue.image}
                  alt={orderValue.image}
                  width="200"
                  height="100"
                />
                <ButtonDanger
                  type="button"
                  onClick={() => {
                    return deleteImageFromDB();
                  }}
                >
                  <FiX></FiX>
                </ButtonDanger>
              </div>
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
