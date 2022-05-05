import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar-brand-text mx-3">Admin Dashboard</div>
      <ul>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user">
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="users">
            <span>Users</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="orders">
            <span>Orders</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="cashflow">
            <span>CashFlow</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <button>Logout</button>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
