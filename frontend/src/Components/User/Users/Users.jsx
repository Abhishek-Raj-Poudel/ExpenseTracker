import React, { useEffect, useMemo, useState } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useOutletContext, NavLink } from "react-router-dom";

export default function Users() {
  const [shop, setShop] = useOutletContext();
  let [allUsers, setAllUsers] = useState([]);
  const http = new HttpClient();

  useEffect(() => {
    if (shop) {
      shop.user_id.map((obj) => {
        http
          .getItemById(`user/${obj}`)
          .then((response) => {
            let responseValue = response.data.data;
            if (!responseValue) {
              // Add Toast Notification
              console.log("No user found 😥");
            }
            return setAllUsers([responseValue]);
            // setIsLoading(false);
            console.log("All Users ", allUsers);
          })
          .catch((error) => {
            //Maybe add toast Notification.
            console.log(error);
          });
      });
    }
  }, [shop]);

  const deleteItem = (id) => {
    http
      .deleteItem(`user/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert
          console.log(response.data.msg);
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
          <FaPlus /> Add User
        </NavLink>
      </h1>
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
              <td>{obj.nationality}</td>
              <td>{obj.role}</td>
              <td>{obj._id}</td>
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
