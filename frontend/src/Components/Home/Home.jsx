import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    return console.log(isOn);
  }, [isOn]);

  return (
    <>
      <h2>Welcome to Office Management System</h2>
      <p>
        Here you can create your office, workers/clients, assign workres
        role,and tesk according to their role then check your cashflow to see if
        people have paid or not
      </p>
    </>
  );
}
