import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";
import Flexbox from "../../../Styles/Flexbox";

import { FiPlus, FiTrash2 } from "react-icons/fi";
import { ButtonDanger } from "../../../Styles/Button";
import { useState } from "react";
import { useEffect } from "react";
import { HttpClient } from "../../../utils/httpClients";
import { error, success } from "../../../utils/utils";
import { TextDanger } from "../../../Styles/Texts";
import { useRef } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [hideForm, setHideForm] = useState(true);

  const dispatch = useDispatch();
  const SHOP = useSelector((state) => state.office);
  const SHOP_ID = useSelector((state) => state.user.shop_id);
  const http = new HttpClient();

  const tempGetAllRoles = useRef();
  const tempSubmitRole = useRef();

  const getAllRoles = () => {
    let rolesArr = [];
    SHOP.roles &&
      SHOP.roles.map(
        (role) => roles.indexOf(role) === -1 && rolesArr.push(role)
      );
    setRoles((prev) => {
      return [...prev, ...rolesArr];
    });
  };

  tempGetAllRoles.current = getAllRoles;

  useEffect(() => {
    tempGetAllRoles.current();
  }, [SHOP.roles]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRoleError(() => {
      return !role && "Role is Required";
    });
    setCanSubmit(true);
  };

  const submitRole = () => {
    if (role && canSubmit) {
      const finalRoles = [...roles, role];
      const uploadValue = { ...SHOP, roles: finalRoles };
      updateShop(uploadValue, `added`);
      setHideForm(true);
    } else if (roleError) {
      setCanSubmit(false);
    }
  };

  tempSubmitRole.current = submitRole;

  useEffect(() => {
    tempSubmitRole.current();
  }, [canSubmit]);

  const updateShop = async (uploadValue, text) => {
    try {
      const updateShop = await http.updateItem(
        `shop/${SHOP_ID}`,
        uploadValue,
        true
      );
      if (updateShop.status !== 200) throw error(updateShop.data.msg);
      dispatch(fetchOfficeSuccess(uploadValue));
      success(`Role ${text} Successfully`);
      setCanSubmit(false);
    } catch (error) {
      error(error);
    }
  };

  return (
    <>
      <Flexbox justify="flex-start" align="center" padding="1rem">
        <h2>Roles</h2>
        {hideForm && (
          <button
            type="button"
            onClick={() => {
              setHideForm(false);
            }}
          >
            <FiPlus />
          </button>
        )}

        <form action="submit">
          {!hideForm && (
            <Flexbox>
              <input
                type="text"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                placeholder={`Enter a Role`}
                required
              />
              <TextDanger>{roleError}</TextDanger>
              <button onClick={handleSubmit}>
                <FiPlus />
              </button>
            </Flexbox>
          )}
        </form>
      </Flexbox>
      <Flexbox justify="flex-start">
        <h3>Add some corporate Roles</h3>
      </Flexbox>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles &&
            roles.map((role, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{role}</td>
                {role !== "Head" && role !== "Client" && (
                  <td>
                    <ButtonDanger
                      onClick={() => {
                        let newArr = roles;
                        newArr.splice(index, 1);
                        let uploadValue = { ...SHOP, roles: newArr };
                        updateShop(uploadValue, `removed`);
                      }}
                    >
                      <FiTrash2 />
                    </ButtonDanger>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
