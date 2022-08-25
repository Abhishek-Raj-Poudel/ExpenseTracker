import React, { useEffect, useState } from "react";
import Toggle from "../Inputs/Toggle";
import { success } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    return console.log(isOn);
  }, [isOn]);

  return (
    <>
      <h2>Welcome to Home</h2>
      <Toggle
        onValue={isOn}
        handleClick={() => {
          setIsOn(!isOn);
          success("On");
        }}
      />
      
    </>
  );
}
