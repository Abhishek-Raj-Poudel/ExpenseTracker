import React, { useEffect, useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
//utilities
import { HttpClient } from "../../../utils/httpClients";
import { error, success } from "../../../utils/utils";
import { Action } from "../Utilities/action";
import { StyledText } from "../../../Styles/Texts";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import Toggle from "../../Inputs/Toggle";

export default function Orders() {
  // Redux
  const SHOP = useSelector((state) => state.office);
  const USER = useSelector((state) => state.user);
  const IMAGE_URL = "https://test-api-chronoabi.herokuapp.com/assets/images/";

  const SHOP_ID = USER.shop_id;

  let [allOrders, setAllOrders] = useState([]);
  let allOrderArr = [];
  let [completedOrders, setCompletedOrders] = useState([]);
  let completedOrderArr = [];

  const http = new HttpClient();
  const dispatch = useDispatch();

  const tempGetAllOrders = useRef();

  useEffect(() => {
    tempGetAllOrders.current();
  }, [SHOP]);

  const getAllOrders = () => {
    SHOP.order_id.map((obj) =>
      http
        .getItemById(`order/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;
          if (responseValue) {
            orderSorting(responseValue);
            allOrderArr.sort((a, b) => Number(b.paid) - Number(a.paid));
            completedOrderArr.sort((a, b) => Number(a.paid) - Number(b.paid));
            setAllOrders([...allOrderArr]);
            setCompletedOrders([...completedOrderArr]);
          } else {
            error("Order not found ");
          }
        })
        .catch((error) => {
          error(error);
        })
    );
  };

  tempGetAllOrders.current = getAllOrders;

  const orderSorting = (responseValue) => {
    if (USER.role === "Head") {
      taskSorting(responseValue);
    } else {
      if (responseValue.assigned_to === USER.role) {
        taskSorting(responseValue);
      }
      if (USER.role === "Client") {
        if (responseValue.client_id === USER.id) {
          taskSorting(responseValue);
        }
      }
    }
  };

  const taskSorting = (responseValue) => {
    if (responseValue.done) {
      if (responseValue.paid) {
        completedOrderArr.push(responseValue);
      } else {
        completedOrderArr.push(responseValue);
      }
    } else {
      allOrderArr.push(responseValue);
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

  const handleOrderCheck = async (index, id, done) => {
    let array = allOrders;
    array[index].done = !done;
    console.log(array);
    try {
      const updateShop = await http.updateItem(
        `order/${id}`,
        { ...array[index] },
        true
      );
      if (!updateShop.status === 200) throw error(updateShop.msg);
      setAllOrders([...array]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompletedOrderCheck = async (index, id, done) => {
    let array = completedOrders;
    array[index].done = !done;
    console.log(array);
    try {
      const updateShop = await http.updateItem(
        `order/${id}`,
        { ...array[index] },
        true
      );
      if (!updateShop.status === 200) throw error(updateShop.msg);
      setCompletedOrders([...array]);
    } catch (error) {
      console.log(error);
    }
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
              <FiPlus />
            </button>
          </NavLink>
        ) : null}
      </Flexbox>
      <h3>All Orders</h3>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Client Name</th>
            <th>Products Bought</th>
            <th>Assigned to</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>Recipt</th>
            <th>Done</th>
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
              <td>
                <StyledText colour={obj.paid ? null : "warning"}>
                  {obj.total_price}
                </StyledText>
              </td>
              <td>
                <StyledText colour={obj.paid ? null : "danger"}>
                  {obj.paid ? <FiThumbsUp /> : <FiThumbsDown />}
                </StyledText>
              </td>
              <td>
                {obj.image !== "" ? (
                  <img
                    src={IMAGE_URL + obj.image}
                    width="200"
                    height="100"
                    onClick={() => {}}
                    alt={obj.image}
                  />
                ) : (
                  "NA"
                )}
              </td>
              <td>
                <Toggle
                  name="done"
                  onValue={obj.done}
                  handleClick={() => {
                    handleOrderCheck(index, obj._id, obj.done);
                  }}
                />
              </td>

              {USER.role && USER.role !== "Client" && (
                <td>
                  <Action
                    obj={obj}
                    handleClick={() => {
                      return deleteItem(obj._id);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Orders Completed</h3>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Client Name</th>
            <th>Products Bought</th>
            <th>Assigned to</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>Recipt</th>
            <th>Done</th>
            {USER.role && USER.role !== "Client" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((obj, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{obj.client_name}</td>
              <td>{obj.products_name}</td>
              <td>{obj.assigned_to}</td>
              <td>
                <StyledText colour={obj.paid ? null : "warning"}>
                  {obj.total_price}
                </StyledText>
              </td>
              <td>
                <StyledText colour={obj.paid ? null : "danger"}>
                  {obj.paid ? <FiThumbsUp /> : <FiThumbsDown />}
                </StyledText>
              </td>
              <td>
                {obj.image !== "" ? (
                  <img
                    src={IMAGE_URL + obj.image}
                    width="200"
                    height="100"
                    onClick={() => {}}
                    alt={obj.image}
                  />
                ) : (
                  "NA"
                )}
              </td>
              <td>
                <Toggle
                  name="done"
                  onValue={obj.done}
                  handleClick={() => {
                    handleCompletedOrderCheck(index, obj._id, obj.done);
                  }}
                />
              </td>

              {USER.role && USER.role !== "Client" && (
                <td>
                  <Action
                    obj={obj}
                    handleClick={() => {
                      return deleteItem(obj._id);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
