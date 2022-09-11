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
import { error, success } from "../../../utils/utils";

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
            orderSorting(responseValue);
            setAllOrders([...allOrderArr]);
          } else {
            error("Order not found ");
          }
        })
        .catch((error) => {
          error(error);
        });
    });
  };

  const orderSorting = (responseValue) => {
    if (USER.role === "Head") {
      allOrderArr.push(responseValue);
    } else {
      if (responseValue.assigned_to === USER.role) {
        allOrderArr.push(responseValue);
      }
      if (USER.role === "Client") {
        if (responseValue.client_id === USER.id) {
          allOrderArr.push(responseValue);
        }
      }
    }
  };

  const deleteItem = (id) => {
    let updatedUsersArr = SHOP.order_id.filter((order) => order !== id);
    http
      .deleteItem(`order/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          success(response.data.msg);
          updateShop(updatedUsersArr);
        } else {
          error(response.data.msg);
        }
      })
      .catch((error) => {
        error(error);
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
          dispatch(fetchOfficeSuccess(updatedShop));
        }
      })
      .catch((error) => {
        error(error);
      });
  };

  return (
    <>
      <Flexbox justify="flex-start" align="center" padding="1rem">
        <h2>Welcome to Your Order List</h2>
        {USER.role !== "Client" ? (
          <NavLink to="create">
            <button>
              <FaPlus /> Add Order
            </button>
          </NavLink>
        ) : null}
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
            {USER.role && USER.role !== "Client" && <th>Action</th>}
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
                {obj.image !== "" ? (
                  <img
                    src={process.env.REACT_APP_IMAGE_URL + obj.image}
                    width="200"
                    height="100"
                    onClick={() => {}}
                    alt={obj.image}
                  />
                ) : (
                  "NA"
                )}
              </td>
              <td>{obj.paid ? "yes" : "no"}</td>
              {USER.role && USER.role !== "Client" && (
                <td>
                  <Flexbox
                    justify="flex-start"
                    align="center"
                    gap="1rem"
                    padding="12px"
                  >
                    <NavLink to={`edit=${obj._id}`}>
                      <Flexbox align="center">
                        <FaPen></FaPen>
                        <span>Edit</span>
                      </Flexbox>
                    </NavLink>
                    <ButtonDanger
                      onClick={() => {
                        return deleteItem(obj._id);
                      }}
                    >
                      <FaTrash></FaTrash>
                    </ButtonDanger>
                  </Flexbox>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
