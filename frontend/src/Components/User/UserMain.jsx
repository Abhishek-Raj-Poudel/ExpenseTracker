import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HttpClient } from "../../utils/httpClients";
import Navbar from "./Navbar";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchOfficeSuccess,
  fetchOfficeFaliure,
} from "../../Redux/Office/officeAction";

export default function UserLayout() {
  const shop_id = useSelector((state) => state.user.shop_id);
  const dispatch = useDispatch();

  const http = new HttpClient();

  // useEffect(() => {
  //   http
  //     .getItemById(`shop/${shop_id}`)
  //     .then((response) => {
  //       dispatch(fetchOfficeSuccess(response.data.data));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchOfficeFaliure(error.msg));
  //     });
  // }, []);

  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </>
  );
}
