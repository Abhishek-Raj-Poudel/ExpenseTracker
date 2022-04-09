import React, { useEffect, useState } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FaPen, FaTrash } from "react-icons/fa";

export default function Users() {
  let [allUsers, setAllUsers] = useState([]);
  const [is_loading, setIsLoading] = useState(true);
  const http = new HttpClient();

  useEffect(() => {
    http
      .getItem(`user`, {
        header: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        let responseValue = response.data.data;
        if (!response.data.data) {
          // Add Toast Notification
          console.log("No user found 😥");
        }
        setAllUsers(responseValue);
        setIsLoading(false);
      })
      .catch((error) => {
        //Maybe add toast Notification.
        console.log(error);
      });
  }, [is_loading]);

  const deleteItem = (id) => {
    http
      .deleteItem(`user/${id}`, true)
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
              <button className="btn btn-sm btn-success">
                <FaPen></FaPen>
              </button>{" "}
              <button className="btn btn-sm btn-danger">
                <FaTrash></FaTrash>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
