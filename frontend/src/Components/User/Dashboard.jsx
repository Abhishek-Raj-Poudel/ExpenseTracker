import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const USER = useSelector((state) => state.user);

  return <h2>Welcome to Dashboard {USER.name}</h2>;
}
