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

import * as User from "./Components/User/index";

const token = "token";
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem(token);
  return isLoggedIn ? children : <Navigate to="/login" />;
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
              <User.UserLayout></User.UserLayout>
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <User.Dashboard></User.Dashboard>
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <User.Users></User.Users>
              </PrivateRoute>
            }
          />
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
                <User.OrdersCreate></User.OrdersCreate>
              </PrivateRoute>
            }
          />
          <Route
            path="cashflow"
            element={
              <PrivateRoute>
                <User.CashFlow></User.CashFlow>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
