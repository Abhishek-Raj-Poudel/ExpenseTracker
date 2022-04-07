import React from "react";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import User from "./Components/User/User";

const token = "token";
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem(token);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
export default function AppRouting() {
  return (
    <Router>
      <>
        <Navbar></Navbar>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User></User>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}
