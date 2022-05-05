import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HttpClient } from "../../utils/httpClients";

export default function UserLayout() {
  const [shop, setShop] = useState();
  const [user, setUser] = useState({});
  const [loadShopData, setLoadShopData] = useState(false);
  const http = new HttpClient();

  useEffect(() => {
    if (!loadShopData) {
      setUser(JSON.parse(localStorage.getItem("user_value")));
      setLoadShopData(true);
    }
  }, []);

  useEffect(() => {
    if (loadShopData) {
      http.getItemById(`shop/${user.shop_id}`).then((response) => {
        setShop(response.data.data);
      });
    }
  }, [loadShopData]);

  return (
    <>
      <nav>{/* Welcome back to {shop.name} {user.name} !! */}</nav>
      <Sidebar></Sidebar>
      <div className="content">
        <Outlet context={[shop, setShop]}></Outlet>
      </div>
    </>
  );
}
