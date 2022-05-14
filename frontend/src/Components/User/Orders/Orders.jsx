import React, { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
import { ButtonDanger } from "../../../Styles/Button";

//utilities
import { HttpClient } from "../../../utils/httpClients";

export default function Orders() {
  // Redux
  const shop = useSelector((state) => state.office);
  const shop_id = useSelector((state) => state.user.shop_id);
  const dispatch = useDispatch();

  let [allOrders, setAllOrders] = useState([]);
  const http = new HttpClient();
  let allOrderArr = [];
  useEffect(() => {
    getAllOrders();
  }, [shop]);

  const getAllOrders = () => {
    shop.order_id.map((obj) => {
      http
        .getItemById(`order/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;
          console.log("response ", responseValue);
          if (responseValue) {
            allOrderArr.push(responseValue);
            setAllOrders([...allOrderArr]);
            console.log(allOrderArr);
          } else {
            console.log("User not found ");
            console.log(shop.order_id);
          }
        })
        .catch((error) => {
          //Maybe add toast Notification.
          console.log(error);
        });
    });
  };

  const deleteItem = (id) => {
    let updatedUsersArr = shop.order_id.filter((order) => order !== id);
    http
      .deleteItem(`order/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert
          updateShop(updatedUsersArr);
        } else {
          // error(response.data.msg);
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateShop = (array) => {
    let updatedShop = {
      ...shop,
      order_id: array,
    };
    http
      .updateItem(`shop/${shop_id}`, updatedShop)
      .then((response) => {
        if (response.data.status === 200) {
          console.log("here");
          dispatch(fetchOfficeSuccess(updatedShop));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Flexbox justify="flex-start" align="center" padding="1rem">
        <h2>Welcome to Your Order List</h2>

        <NavLink to="create">
          <button>
            <FaPlus /> Add Order
          </button>
        </NavLink>
      </Flexbox>

      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Client Name</th>
            <th>Products Bought</th>
            <th>Assigned to</th>
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
              <td>{obj.assigned_to}</td>
              <td>{obj.total_price}</td>
              <td>{obj.paid ? "yes" : "no"}</td>
              <td>
                <Flexbox
                  justify="flex-start"
                  align="center"
                  gap="1rem"
                  padding="12pxc"
                >
                  <NavLink to={`edit=${obj._id}`}>
                    <Flexbox align="center">
                      <FaPen></FaPen>
                      <span>Edit</span>
                    </Flexbox>
                  </NavLink>
                  <ButtonDanger
                    onClick={(event) => {
                      return deleteItem(obj._id);
                    }}
                  >
                    <FaTrash></FaTrash>
                  </ButtonDanger>
                </Flexbox>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
