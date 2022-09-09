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

import { success, error } from "../../../utils/utils";
import { ButtonDanger } from "../../../Styles/Button";
import { FiX } from "react-icons/fi";

export default function OrdersCreate() {
  const commonFields = {
    client_name: "",
    client_id: "",
    products_name: "",
    assigned_to: "",
    image: "",
    total_price: 0,
  };

  const [orderValue, setOrderValue] = useState(commonFields);
  const [orderValueErr, setOrderValueErr] = useState(commonFields);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [clients, setClients] = useState([]);

  const navigate = useNavigate();
  const http = new HttpClient();

  //Redux Stuff
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.office);
  const shop_id = useSelector((state) => state.user.shop_id);

  let allOrdersArr = [];
  let clientNameArr = [];

  useEffect(() => {
    shop.client_id.map(async (obj) => {
      try {
        const response = await http.getItemById(`user/${obj}`);
        let responseValue = response.data.data;
        if (responseValue) {
          clientNameArr.push(responseValue);
          setClients([...clientNameArr]);
        }
      } catch (error) {
        error("client not found ");
      }
    });
  }, [orderValue.client_id]);

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
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updateOrder = await http.uploader(
        orderValue,
        filesToUpload,
        "POST",
        "order",
        true
      );
      allOrdersArr = [...shop.order_id, updateOrder.data._id];
      success(updateOrder.msg);

      const uploadValue = { ...shop, order_id: allOrdersArr };
      const updateOrderListInShop = await http.updateItem(
        `shop/${shop_id}`,
        uploadValue
      );
      success(updateOrderListInShop.data.msg);
      dispatch(fetchOfficeSuccess(uploadValue));
      navigate("/user/orders");
    } catch (error) {
      error(error.msg);
      dispatch(fetchOfficeFaliure(error.msg));
    }
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
          <label>Recipt </label>
          <input type="file" onChange={handleChange} name="image" />
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
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Flexbox>
    </>
  );
}
