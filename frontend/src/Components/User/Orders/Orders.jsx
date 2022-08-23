import React, { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
import { ButtonDanger } from "../../../Styles/Button";

//utilities
import { HttpClient } from "../../../utils/httpClients";

export default function Orders() {
  // Redux
  const SHOP = useSelector((state) => state.office);
  const USER = useSelector((state) => state.user);

  const SHOP_ID = USER.shop_id;

  let [allOrders, setAllOrders] = useState([]);
  let allOrderArr = [];

  const http = new HttpClient();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllOrders();
  }, [SHOP]);

  const getAllOrders = () => {
    SHOP.order_id.map((obj) => {
      http
        .getItemById(`order/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;
          if (responseValue) {
            if (USER.role !== "Designer") {
              allOrderArr.push(responseValue);
            } else {
              if (responseValue.assigned_to === "Designer") {
                allOrderArr.push(responseValue);
              }
            }
            setAllOrders([...allOrderArr]);
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

  const deleteItem = (id) => {
    let updatedUsersArr = SHOP.order_id.filter((order) => order !== id);
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
      ...SHOP,
      order_id: array,
    };
    http
      .updateItem(`shop/${SHOP_ID}`, updatedShop)
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
            <th>Recipt</th>
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
              <td>
                {obj.image != "" ? (
                  <img
                    src={process.env.REACT_APP_IMAGE_URL + obj.image}
                    width={100}
                    height={100}
                    onClick={() => {}}
                  />
                ) : (
                  "NA"
                )}
              </td>
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
