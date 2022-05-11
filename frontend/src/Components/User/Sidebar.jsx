import React from "react";
import { NavLink } from "react-router-dom";
// style
import styled from "styled-components";
import {
  FaDesktop,
  FaRegUser,
  FaTasks,
  FaRegMoneyBillAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const SidebarStyle = styled.div`
  grid-area: sidebar;
  padding: 32px 64px 32px 32px;
  background-color: ${({ theme }) => theme.colour.cards};
  border-radius: 0 8px 8px 0;
  gap: 1rem;

  & h3 {
    padding: 8px 8px 32px 8px;
  }

  & ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    color: ${({ theme }) => theme.colour.sidebarText};
  }

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.colour.sidebarText};
  }

  & li {
    display: flex;
    gap: 8px;
    padding: 12px;
    list-style-type: none;
    align-items: center;
  }

  & li:last-child {
    padding-top: 300px;
    justify-self: flex-end;
  }
`;

export default function Sidebar() {
  return (
    <SidebarStyle>
      <h3>User Dashboard</h3>
      <ul>
        <li>
          <FaDesktop />
          <NavLink to="/user">
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <FaRegUser />
          <NavLink to="users">
            <span>Users</span>
          </NavLink>
        </li>

        <li>
          <FaTasks />
          <NavLink to="orders">
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <FaRegMoneyBillAlt />
          <NavLink to="cashflow">
            <span>Cashflow</span>
          </NavLink>
        </li>

        <li>
          <FaSignOutAlt />
          <NavLink to="/logout">
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </SidebarStyle>
  );
}
