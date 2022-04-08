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
import UserLayout from "./Components/User/UserLayout";
import Dashboard from "./Components/User/Dashboard";
import Layout from "./Components/Layout";
import Orders from "./Components/User/Orders";
import Users from "./Components/User/Users";
import CashFlow from "./Components/User/CashFlow";

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
              <UserLayout></UserLayout>
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <Users></Users>
              </PrivateRoute>
            }
          />
          <Route
            path="orders"
            element={
              <PrivateRoute>
                <Orders></Orders>
              </PrivateRoute>
            }
          />
          <Route
            path="cashflow"
            element={
              <PrivateRoute>
                <CashFlow></CashFlow>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
