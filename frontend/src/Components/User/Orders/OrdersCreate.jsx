import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../Inputs/inputs";
import { HttpClient } from "../../../utils/httpClients";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchOfficeSuccess,
  fetchOfficeFaliure,
} from "../../../Redux/Office/officeAction";
import Form from "../../../Styles/Form";
import Flexbox from "../../../Styles/Flexbox";

export default function OrdersCreate() {
  const commonFields = {
    client_name: "",
    client_id: "",
    products_name: "",
    assigned_to: "",
    images: [],
    total_price: 0,
  };

  const [orderValue, setOrderValue] = useState(commonFields);
  const [orderValueErr, setOrderValueErr] = useState(commonFields);

  const dispatch = useDispatch();
  const shop = useSelector((state) => state.office);

  let allOrdersArr = [];

  const http = new HttpClient();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  let clientNameArr = [];

  useEffect(() => {
    getAllClients();
  }, [orderValue.client_id]);

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
            console.log("User not found ");
          }
        })
        .catch((error) => {
          //Maybe add toast Notification.
          console.log(error);
        });
    });
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type == "file") {
      let filesToUpload = [];
      Object.keys(files).map((key) => {
        filesToUpload.push(files[key]);
      });
      setOrderValue({ images: filesToUpload });

    }

    setOrderValue({ ...orderValue, [name]: value });
    console.log(orderValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("here");
    uploadForm();
  };

  const uploadForm = () => {
    console.log("here2");

    http
      .postItem("order", orderValue, {
        authorization: `${localStorage.getItem("token")}`,
      })
      .then((response) => {
        if (response.status === 200) {
          allOrdersArr = [...shop.order_id, response.data.data._id];
          updateOrderListInShop(allOrdersArr);
        }
      })
      .catch((error) => {
        console.log("Error: ", error.msg);
      });
  };

  const updateOrderListInShop = (value) => {
    const uploadValue = { ...shop, order_id: value };
    http
      .updateItem(`shop/${shop.id}`, uploadValue)
      .then((response) => {
        dispatch(fetchOfficeSuccess(uploadValue));
        navigate("/user/orders");
      })
      .catch((error) => {
        dispatch(fetchOfficeFaliure(error.msg));
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
          <span>{orderValueErr.client_name}</span>

          <label>Client</label>
          <select name="client_id" onChange={handleChange}>
            <option value="">--Who's order is this--</option>
            {clients.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
          <span>{orderValueErr.client_id}</span>

          <Input
            label="Produce Name"
            name="products_name"
            handleChange={handleChange}
          />
          <span>{orderValueErr.product_id}</span>

          <label>Assigned To</label>
          <select name="assigned_to" onChange={handleChange}>
            <option value="">---Assigned to--- </option>
            <option value="Accountant">Accountant</option>
            <option value="Designer">Designer</option>
            <option value="Writer">Writer</option>
            <option value="Writer">Staff</option>
          </select>
          <span>{orderValueErr.assigned_to}</span>

          <Input
            label="Total Price"
            name="total_price"
            type="number"
            handleChange={handleChange}
          />
          <span>{orderValueErr.product_id}</span>
          <label>Images: </label>
          <input type="file" onChange={handleChange} name="image" multiple />
          <button
            type="submit"
            onChange={() => {
              console.log("all clients ", orderValue);
            }}
          >
            test
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </>
  );
}
