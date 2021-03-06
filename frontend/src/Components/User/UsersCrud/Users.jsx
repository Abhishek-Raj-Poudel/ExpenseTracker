import React, { useEffect, useState } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOfficeSuccess,
  fetchOfficeFaliure,
} from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
import { ButtonDanger } from "../../../Styles/Button";

export default function Users() {
  // Redux
  const shop = useSelector((state) => state.office);
  const shop_id = useSelector((state) => state.user.shop_id);
  const dispatch = useDispatch();

  let [allStaffs, setAllStaffs] = useState([]);
  let [allClients, setAllClients] = useState([]);

  const http = new HttpClient();

  let allStaffArr = [];
  let allClientsArr = [];

  useEffect(() => {
    getAllStaffs();
    getAllClients();
  }, [shop]);

  const getAllStaffs = () => {
    shop.staff_id.map((obj) => {
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            allStaffArr.push(responseValue);
            setAllStaffs([...allStaffArr]);
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
  const getAllClients = () => {
    shop.client_id.map((obj) => {
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            allClientsArr.push(responseValue);
            setAllClients([...allClientsArr]);
            console.log("state", allClients);
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

  const deleteStaff = (id) => {
    let updatedStaffArr = shop.staff_id.filter((user) => user !== id);
    http
      .deleteItem(`user/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert
          updateStaffInShop(updatedStaffArr);
        } else {
          // error(response.data.msg);
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteClient = (id) => {
    let updatedClientArr = shop.client_id.filter((user) => user !== id);
    http
      .deleteItem(`user/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert
          console.log(response.data.msg);
          updateClientInShop(updatedClientArr);
        } else {
          // error(response.data.msg);
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStaffInShop = (array) => {
    http
      .updateItem(`shop/${shop_id}`, {
        ...shop,
        staff_id: array,
      })
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(fetchOfficeSuccess({ ...shop, staff_id: array }));
        }
      })
      .catch((error) => {
        dispatch(fetchOfficeFaliure(error.msg));
      });
  };
  const updateClientInShop = (array) => {
    http
      .updateItem(`shop/${shop_id}`, {
        ...shop,
        user_id: array,
      })
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(fetchOfficeSuccess({ ...shop, client_id: array }));
        }
      })
      .catch((error) => {
        dispatch(fetchOfficeFaliure(error.msg));
      });
  };

  return (
    <>
      <Flexbox justify="flex-start" align="center" padding="1rem">
        <h2>Welcome to Your Users List</h2>

        <NavLink to="create">
          <button>
            <FaPlus /> Add User
          </button>
        </NavLink>
      </Flexbox>
      <h3>All Staffs</h3>
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
          {allStaffs.map((obj, index) => (
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
                      return deleteStaff(obj._id);
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
      <h3>All Clients</h3>
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
          {allClients.map((obj, index) => (
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
                      return deleteClient(obj._id);
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
