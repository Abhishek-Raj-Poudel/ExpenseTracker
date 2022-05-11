import React, { useEffect, useState } from "react";
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
    total_price: "",
  };

  const [orderValue, setOrderValue] = useState(commonFields);
  const [orderValueErr, setOrderValueErr] = useState(commonFields);
  const shop = useSelector((state) => state.office);

  const http = new HttpClient();

  const [clients, setClients] = useState([]);
  let clientNameArr = [];

  useEffect(() => {
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
    const { name, value } = event.target;
    setOrderValue({ ...orderValue, [name]: value });
    console.log(orderValue);
    if (orderValue.client_id) {
      let clientName = clients.map((client) => {
        if (client._id === orderValue.client_id) {
          return client.name;
        }
      });
      setOrderValue({ ...orderValue, client_name: clientName });
    }
  };
  const handleSubmit = () => {};

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
            name="product_name"
            onChange={handleChange}
          />
          <span>{orderValueErr.product_id}</span>

          <label>Assigned To</label>
          <select name="client_id" onChange={handleChange}>
            <option value="">---Assigned to--- </option>
            <option value="Client">Client</option>
            <option value="Accountant">Accountant</option>
            <option value="Designer">Designer</option>
            <option value="Writer">Writer</option>
            <option value="Writer">Staff</option>
          </select>
          <span>{orderValueErr.client_id}</span>

          <Input
            label="Total Price"
            name="total_price"
            onChange={handleChange}
          />
          <span>{orderValueErr.product_id}</span>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </>
  );
}
