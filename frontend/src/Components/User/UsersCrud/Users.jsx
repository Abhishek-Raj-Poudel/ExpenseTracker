import React, { useEffect, useState, useRef } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Action } from "../Utilities/action";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOfficeSuccess,
  fetchOfficeFaliure,
} from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";
import { error, success } from "../../../utils/utils";

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

  const tempGetAllValues = useRef();

  const getAllValues = () => {
    shop.staff_id.map((obj) =>
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            allStaffArr.push(responseValue);
            setAllStaffs([...allStaffArr]);
          } else {
            error("Order not found ");
          }
        })
        .catch((error) => {
          error(error);
        })
    );

    shop.client_id.map((obj) =>
      http
        .getItemById(`user/${obj}`)
        .then((response) => {
          let responseValue = response.data.data;

          if (responseValue) {
            allClientsArr.push(responseValue);
            setAllClients([...allClientsArr]);
          } else {
            error("Order not found ");
          }
        })
        .catch((error) => {
          error(error);
        })
    );
  };

  tempGetAllValues.current = getAllValues;

  useEffect(() => {
    tempGetAllValues.current();
  }, [shop]);

  const deleteStaff = (id) => {
    let updatedStaffArr = shop.staff_id.filter((user) => user !== id);
    http
      .deleteItem(`user/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          success(response.data.msg);
          updateStaffInShop(updatedStaffArr);
        } else {
          error(response.data.msg);
        }
      })
      .catch((error) => {
        error(error);
      });
  };
  const deleteClient = (id) => {
    let updatedClientArr = shop.client_id.filter((user) => user !== id);
    http
      .deleteItem(`user/${id}`, true)
      .then((response) => {
        if (response.data.status === 200) {
          success(response.data.msg);
          updateClientInShop(updatedClientArr);
        } else {
          error(response.data.msg);
        }
      })
      .catch((error) => {
        error(error);
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
            <FiPlus />
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
                <Action
                  obj={obj}
                  handleClick={() => {
                    return deleteStaff(obj._id);
                  }}
                />
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
                <Action
                  obj={obj}
                  handleClick={() => {
                    return deleteClient(obj._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
