import React from "react";
import Home from "./Components/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login, { Logout } from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout";
import { useSelector } from "react-redux";

import * as User from "./Components/User/index";

const token = "token";
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem(token);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function UserType({ children }) {
  const USER = useSelector((state) => state.user);
  return USER.role === "Head" ? children : <Navigate to="/user/orders" />;
}

export default function AppRouting() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout></Layout>}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User.UserMain></User.UserMain>
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={
              <PrivateRoute>
                <User.Dashboard></User.Dashboard>
              </PrivateRoute>
            }
          />
          {/* All Users */}
          <Route
            path="users"
            element={
              <PrivateRoute>
                <UserType>
                  <User.Users></User.Users>
                </UserType>
              </PrivateRoute>
            }
          />
          <Route
            path="users/create"
            element={
              <PrivateRoute>
                <UserType>
                  <User.UserCreate></User.UserCreate>
                </UserType>
              </PrivateRoute>
            }
          />
          <Route
            path="users/edit=:id"
            element={
              <PrivateRoute>
                <UserType>
                  <User.UserEdit></User.UserEdit>
                </UserType>
              </PrivateRoute>
            }
          />
          {/* All Orders */}
          <Route
            path="orders"
            element={
              <PrivateRoute>
                <User.Orders></User.Orders>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="orders/create"
            element={
              <PrivateRoute>
                <User.OrdersCreate></User.OrdersCreate>
              </PrivateRoute>
            }
          />
          <Route
            path="orders/edit=:id"
            element={
              <PrivateRoute>
                <User.OrdersEdit></User.OrdersEdit>
              </PrivateRoute>
            }
          />
          {/* All CashFlow */}
          <Route
            path="cashflow"
            element={
              <PrivateRoute>
                <UserType>
                  <User.CashFlow></User.CashFlow>
                </UserType>
              </PrivateRoute>
            }
          />
          {/* All Roles */}
          <Route
            path="roles"
            element={
              <PrivateRoute>
                <UserType>
                  <User.Roles></User.Roles>
                </UserType>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
