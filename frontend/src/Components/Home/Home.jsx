import React, { useEffect, useState } from "react";
import Toggle from "../Inputs/Toggle";
import { toast } from "react-toastify";
import { success } from "../../utils/utils";

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
