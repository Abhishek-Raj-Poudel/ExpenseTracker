import React, { useState } from "react";
import { Input } from "../../Inputs/inputs";

export default function OrdersCreate() {
  const commonFields = {
    client_name: "",
    client_id: "",
    products_name: "",
    products_id: "",
    total_price: "",
    recept_images: "",
  };

  const [orderValue, setOrderValue] = useState(commonFields);
  const [orderValueErr, setOrderValueErr] = useState(commonFields);

  return (
    <>
      <h2>Create an Order</h2>
      <Input label="Client Name" name="client_name"></Input>
    </>
  );
}
