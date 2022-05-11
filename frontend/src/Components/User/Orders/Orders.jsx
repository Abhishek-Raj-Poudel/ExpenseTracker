import React, { useEffect, useState } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
import { ButtonDanger } from "../../../Styles/Button";

export default function Users() {
  // Redux
  const shop = useSelector((state) => state.office);
  const shop_id = useSelector((state) => state.user.shop_id);
  const dispatch = useDispatch();

  let [allOrders, setAllOrders] = useState([]);
  const http = new HttpClient();
  let allUserArr = [];
  useEffect(() => {
    getAllOrders();
  }, [shop]);

  const getAllOrders = () => {
    shop.order_id.map((obj) => {
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            allUserArr.push(responseValue);
            setAllOrders([...allUserArr]);
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
    let updatedUsersArr = shop.user_id.filter((user) => user !== id);
    http
      .deleteItem(`user/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert
          console.log(response.data.msg);
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
    http
      .updateItem(`shop/${shop_id}`, {
        ...shop,
        user_id: array,
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log("here");
          dispatch(fetchOfficeSuccess({ ...shop, user_id: array }));
        }
      })
      .catch();
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
            <th>Total Price</th>
            <th>Paid</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((obj, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{obj.name}</td>
              <td>{obj.email}</td>
              <td>{obj.gender}</td>
              <td>{obj.role}</td>
              <td>{obj._id}</td>
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

{
  /* <th>S.N</th>
            <th>Client Name</th>
            <th>Products Bought</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>Action</th> */
}
