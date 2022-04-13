import React, { useEffect, useState } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Orders() {
  let [allOrders, setAllOrders] = useState([]);
  const [is_loading, setIsLoading] = useState(true);
  const http = new HttpClient();
  const token = localStorage.getItem("token");

  useEffect(() => {
    http
      .getItem(`order`, { headers: { Authorization: `${token}` } })
      .then((response) => {
        let responseValue = response.data.data;
        if (!response.data.data) {
          // Add Toast Notification
          console.log("No user found 😥");
        }
        setAllOrders(responseValue);
        setIsLoading(false);
      })
      .catch((error) => {
        //Maybe add toast Notification.
        console.log(error);
      });
  }, [is_loading]);

  const deleteItem = (id) => {
    http
      .deleteItem(`order/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert
          console.log(response.data.msg);
          setIsLoading(true);
        } else {
          // error(response.data.msg);
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>
        Welcome to Your Order List
        <NavLink to="create">
          <FaPlus /> Add Order
        </NavLink>
      </h1>

      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Client Name</th>
            <th>Products Bought</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((obj, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{obj.client_name}</td>
              <td>{obj.products_name}</td>
              <td>{obj.total_price}</td>
              <td>{obj.paid ? "Yes" : "No"}</td>
              <td>
                <NavLink to={`edit=${obj._id}`}>
                  <FaPen></FaPen>
                </NavLink>{" "}
                <button
                  onClick={(event) => {
                    return deleteItem(obj._id);
                  }}
                >
                  <FaTrash></FaTrash>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
