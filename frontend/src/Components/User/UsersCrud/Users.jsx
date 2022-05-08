import React, { useEffect, useState } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

//style
import Card from "../../../Styles/Card";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";

export default function Users() {
  // Redux
  const shop = useSelector((state) => state.office);
  const shop_id = useSelector((state) => state.user.shop_id);
  const dispatch = useDispatch();

  let [allUsers, setAllUsers] = useState([]);
  const http = new HttpClient();
  let allUserArr = [];
  useEffect(() => {
    getAllUsers();
  }, [shop]);

  const getAllUsers = () => {
    shop.user_id.map((obj) => {
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            allUserArr.push(responseValue);
            setAllUsers([...allUserArr]);
            console.log("state", allUsers);
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
    console.log("id ", id);
    console.log("initial array ", shop.user_id);
    console.log("updatedUsersArr ", updatedUsersArr);

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
      <h2>
        Welcome to Your Order List
        <NavLink to="create">
          <button>
            <FaPlus /> Add User
          </button>
        </NavLink>
      </h2>
      <Card>
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Role</th>
              <th>id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((obj, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>{obj.gender}</td>
                <td>{obj.role}</td>
                <td>{obj._id}</td>
                <td>
                  <button>
                    <NavLink to={`edit=${obj._id}`}>
                      <FaPen></FaPen>
                      Edit
                    </NavLink>
                  </button>{" "}
                  <button
                    onClick={(event) => {
                      return deleteItem(obj._id);
                    }}
                  >
                    <FaTrash></FaTrash>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
