import React from "react";
import { NavLink } from "react-router-dom";
// style
import styled from "styled-components";

import {
  FiDollarSign,
  FiLayers,
  FiList,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";

import { useSelector } from "react-redux";

const SidebarStyle = styled.div`
  grid-area: sidebar;
  padding: 32px 64px 32px 32px;
  background-color: ${({ theme }) => theme.colour.background};
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
    background: ${({ theme, isActive }) =>
      !isActive ? theme.colour.background : theme.colour.inputField};
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
  const USER = useSelector((state) => state.user);
  return (
    <SidebarStyle>
      <h3>Dashboard</h3>
      <ul>
        {USER.role && USER.role === "Head" && (
          <li>
            <FiLayers />
            <NavLink to="roles">
              <span>Roles</span>
            </NavLink>
          </li>
        )}
        {USER.role && USER.role === "Head" && (
          <li>
            <FiUsers />
            <NavLink to="users">
              <span>Users</span>
            </NavLink>
          </li>
        )}

        <li>
          <FiList />
          <NavLink to="orders">
            <span>Orders</span>
          </NavLink>
        </li>

        {USER.role && USER.role === "Head" && (
          <li>
            <FiDollarSign />
            <NavLink to="cashflow">
              <span>Cashflow</span>
            </NavLink>
          </li>
        )}

        <li>
          <FiLogOut />
          <NavLink to="/logout">
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </SidebarStyle>
  );
}
