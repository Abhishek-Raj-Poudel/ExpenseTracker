import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function UserLayout() {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </>
  );
}
